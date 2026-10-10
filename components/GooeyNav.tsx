'use client'

import { useRef, useEffect } from 'react'

export interface GooeyNavItem {
    label: string
    href: string
}

export interface GooeyNavProps {
    items: GooeyNavItem[]
    animationTime?: number
    particleCount?: number
    particleDistances?: [number, number]
    particleR?: number
    timeVariance?: number
    colors?: number[]
    activeIndex: number
    onItemClick: (index: number) => void
}

/**
 * Particle helpers live at module scope: they call `Math.random()`, which the
 * compiler's purity rule refuses inside a component's render path, and they are
 * only ever reached from the burst that runs on click, never during render.
 */
const noise = (n = 1) => n / 2 - Math.random() * n

const getXY = (distance: number, pointIndex: number, totalPoints: number) => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
}

const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number,
    particleCount: number,
    colors: number[]
) => {
    const rotate = noise(r / 10)
    return {
        start: getXY(d[0], particleCount - i, particleCount),
        end: getXY(d[1] + noise(7), particleCount - i, particleCount),
        time: t,
        scale: 1 + noise(0.2),
        color: colors[Math.floor(Math.random() * colors.length)],
        rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    }
}

export function GooeyNav({
    items,
    animationTime = 600,
    particleCount = 15,
    particleDistances = [90, 10],
    particleR = 100,
    timeVariance = 300,
    colors = [1, 2, 3, 1, 2, 3, 1, 4],
    activeIndex,
    onItemClick,
}: GooeyNavProps) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const navRef = useRef<HTMLUListElement | null>(null)
    const filterRef = useRef<HTMLSpanElement | null>(null)
    const textRef = useRef<HTMLSpanElement | null>(null)

    const makeParticles = (element: HTMLElement) => {
        const d = particleDistances
        const r = particleR
        const bubbleTime = animationTime * 2 + timeVariance
        element.style.setProperty('--time', `${bubbleTime}ms`)

        for (let i = 0; i < particleCount; i++) {
            const t = animationTime * 2 + noise(timeVariance * 2)
            const p = createParticle(i, t, d, r, particleCount, colors)
            element.classList.remove('active')

            setTimeout(() => {
                const particle = document.createElement('span')
                const point = document.createElement('span')
                particle.classList.add('particle')
                particle.style.setProperty('--start-x', `${p.start[0]}px`)
                particle.style.setProperty('--start-y', `${p.start[1]}px`)
                particle.style.setProperty('--end-x', `${p.end[0]}px`)
                particle.style.setProperty('--end-y', `${p.end[1]}px`)
                particle.style.setProperty('--time', `${p.time}ms`)
                particle.style.setProperty('--scale', `${p.scale}`)
                particle.style.setProperty('--color', `var(--color-${p.color}, white)`)
                particle.style.setProperty('--rotate', `${p.rotate}deg`)

                point.classList.add('point')
                particle.appendChild(point)
                element.appendChild(particle)
                requestAnimationFrame(() => {
                    element.classList.add('active')
                })
                setTimeout(() => {
                    try {
                        element.removeChild(particle)
                    } catch {
                        // Do nothing
                    }
                }, t)
            }, 30)
        }
    }

    const updateEffectPosition = (element: HTMLElement) => {
        if (!containerRef.current || !filterRef.current || !textRef.current) return
        const containerRect = containerRef.current.getBoundingClientRect()
        const pos = element.getBoundingClientRect()

        const styles = {
            left: `${pos.x - containerRect.x}px`,
            top: `${pos.y - containerRect.y}px`,
            width: `${pos.width}px`,
            height: `${pos.height}px`,
        }
        Object.assign(filterRef.current.style, styles)
        Object.assign(textRef.current.style, styles)
        textRef.current.innerText = element.querySelector('a')?.innerText ?? element.innerText
        textRef.current.style.opacity = '1'
    }

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
        const target = e.currentTarget
        const liEl = target.parentElement as HTMLElement
        if (activeIndex === index) return

        onItemClick(index)
        if (liEl) updateEffectPosition(liEl)

        if (filterRef.current) {
            const particles = filterRef.current.querySelectorAll('.particle')
            particles.forEach((p) => filterRef.current?.removeChild(p))
        }

        if (textRef.current) {
            textRef.current.classList.remove('active')
            void textRef.current.offsetWidth
            textRef.current.classList.add('active')
        }

        if (filterRef.current) {
            makeParticles(filterRef.current)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            e.currentTarget.click()
        }
    }

    useEffect(() => {
        if (!navRef.current || !containerRef.current) return
        if (activeIndex < 0 || activeIndex >= items.length) {
            if (textRef.current) {
                textRef.current.innerText = ''
                textRef.current.style.opacity = '0'
            }
            return
        }
        const activeLi = navRef.current.querySelectorAll('li')[activeIndex] as HTMLElement | undefined
        if (activeLi) {
            updateEffectPosition(activeLi)
            textRef.current?.classList.add('active')
        }

        const resizeObserver = new ResizeObserver(() => {
            if (activeIndex < 0 || activeIndex >= items.length) return
            const currentActiveLi = navRef.current?.querySelectorAll('li')[activeIndex] as HTMLElement | undefined
            if (currentActiveLi) {
                updateEffectPosition(currentActiveLi)
            }
        })

        resizeObserver.observe(containerRef.current)
        return () => resizeObserver.disconnect()
        // `items` and `updateEffectPosition` stay out of the dependency list on
        // purpose: the observer has to be rebuilt when the active item changes,
        // not when a caller hands over a fresh array literal.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeIndex])

    return (
        <div className="gooey-nav-container" ref={containerRef}>
            <nav>
                <ul ref={navRef}>
                    {items.map((item, index) => (
                        <li key={item.label} className={activeIndex === index ? 'active' : ''}>
                            <a
                                href={item.href}
                                onClick={(e) => handleClick(e, index)}
                                onKeyDown={handleKeyDown}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <span className="effect filter" ref={filterRef} />
            <span className="effect text" ref={textRef} />
        </div>
    )
}