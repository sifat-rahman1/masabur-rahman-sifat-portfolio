type IconProps = {
  className?: string
}

/** Hairline arrow, drawn rather than imported: no icon font, no dependency. */
export function ArrowUpRight({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M4.5 11.5L11.5 4.5M6 4.5H11.5V10"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function ArrowUp({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M8 12.5V3.5M4 7.5L8 3.5L12 7.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="square"
      />
    </svg>
  )
}

/** Small solid square, used as the availability marker. */
export function Marker({ className = "" }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[0.4rem] w-[0.4rem] shrink-0 bg-current ${className}`}
    />
  )
}
