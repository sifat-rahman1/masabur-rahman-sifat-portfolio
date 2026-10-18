"use client"

import React, { useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import "./ProfileCard.css"

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max)
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision))

interface ProfileCardProps {
  avatarUrl?: string
  iconUrl?: string
  className?: string
  enableTilt?: boolean
  miniAvatarUrl?: string
  name?: string
  title?: string
  handle?: string
  status?: string
  contactText?: string
  showUserInfo?: boolean
  onContactClick?: () => void
}

const ProfileCardComponent = ({
  avatarUrl = "/images/sifat-portrait-no-bg.png",
  className = "",
  enableTilt = true,
  miniAvatarUrl,
  name = "Sifat",
  title = "AI-Native Builder & Designer",
  handle = "sifat",
  status = "Available for Hire",
  contactText = "Get in Touch",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)

  // Use avatarUrl directly; filenames are pre-sanitized in /public/images

  const avatarUrlRef = useMemo(() => {
    return avatarUrl || ""
  }, [avatarUrl])

  const miniAvatarUrlRef = useMemo(() => {
    return miniAvatarUrl || avatarUrl
  }, [miniAvatarUrl, avatarUrl])

  const tiltEngine = useMemo(() => {
    if (!enableTilt) return null

    let rafId: number | null = null
    let running = false
    let lastTs = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current
      const wrap = wrapRef.current
      if (!shell || !wrap) return

      const width = shell.clientWidth || 1
      const height = shell.clientHeight || 1

      const percentX = clamp((100 / width) * x)
      const percentY = clamp((100 / height) * y)

      const centerX = percentX - 50
      const centerY = percentY - 50

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--rotate-x": `${round(-(centerX / 6))}deg`,
        "--rotate-y": `${round(centerY / 5)}deg`,
      }

      for (const [k, v] of Object.entries(properties)) {
        wrap.style.setProperty(k, v)
      }
    }

    const step = (ts: number) => {
      if (!running) return
      if (lastTs === 0) lastTs = ts
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      const k = 1 - Math.exp(-dt / 0.14)
      currentX += (targetX - currentX) * k
      currentY += (targetY - currentY) * k

      setVarsFromXY(currentX, currentY)

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(step)
      } else {
        running = false
        lastTs = 0
      }
    }

    return {
      setImmediate(x: number, y: number) {
        currentX = x
        currentY = y
        setVarsFromXY(x, y)
      },
      setTarget(x: number, y: number) {
        targetX = x
        targetY = y
        if (!running) {
          running = true
          lastTs = 0
          rafId = requestAnimationFrame(step)
        }
      },
      toCenter() {
        const shell = shellRef.current
        if (shell) this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2)
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId)
        running = false
      },
    }
  }, [enableTilt])

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!shellRef.current || !tiltEngine) return
    const rect = shellRef.current.getBoundingClientRect()
    tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }, [tiltEngine])

  const handlePointerEnter = useCallback((e: PointerEvent) => {
    if (!shellRef.current || !tiltEngine) return
    shellRef.current.classList.add("active")
    const rect = shellRef.current.getBoundingClientRect()
    tiltEngine.setTarget(e.clientX - rect.left, e.clientY - rect.top)
  }, [tiltEngine])

  const handlePointerLeave = useCallback(() => {
    if (!shellRef.current || !tiltEngine) return
    tiltEngine.toCenter()
    shellRef.current.classList.remove("active")
  }, [tiltEngine])

  useEffect(() => {
    if (!enableTilt || !tiltEngine) return
    const shell = shellRef.current
    if (!shell) return

    shell.addEventListener("pointerenter", handlePointerEnter)
    shell.addEventListener("pointermove", handlePointerMove)
    shell.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter)
      shell.removeEventListener("pointermove", handlePointerMove)
      shell.removeEventListener("pointerleave", handlePointerLeave)
      tiltEngine.cancel()
    }
  }, [enableTilt, tiltEngine, handlePointerMove, handlePointerEnter, handlePointerLeave])

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()}>
      <div className="pc-behind" />
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />

            {/* Header Text */}
            <div className="pc-header-content">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>

            {/* Main Portrait with Fade Mask */}
            <div className="pc-avatar-container">
              {avatarUrlRef && (
                <Image
                  className="avatar"
                  src={avatarUrlRef}
                  alt={`${name} portrait`}
                  width={350}
                  height={467}
                  sizes="(max-width: 768px) 92vw, 350px"
                  loading="lazy"
                  style={{ height: "auto" }}
                  onError={() => {
                    console.error("Failed to load profile image path:", avatarUrlRef)
                  }}
                />
              )}
            </div>

            {/* Bottom Glass Pill */}
            {showUserInfo && (
              <div className="pc-user-info">
                <div className="pc-user-details">
                  <div className="pc-mini-avatar">
                    {/* 24-28px, sized by .pc-mini-avatar in ProfileCard.css. */}
                    <Image
                      src={miniAvatarUrlRef}
                      alt={name}
                      width={72}
                      height={72}
                      sizes="36px"
                      loading="lazy"
                    />
                  </div>
                  <div className="pc-user-text">
                    <span className="pc-handle">@{handle}</span>
                    <span className="pc-status">{status}</span>
                  </div>
                </div>
                <button className="pc-contact-btn" onClick={onContactClick} type="button">
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

const ProfileCard = React.memo(ProfileCardComponent)
export default ProfileCard
