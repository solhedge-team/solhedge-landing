type Props = {
  className?: string
  size?: number
  tilt?: number
}

export function SolCoin({ className, size = 40, tilt = 0 }: Props) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
        <defs>
          <radialGradient id="sol-body" cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#2a2d45" />
            <stop offset="55%" stopColor="#15172a" />
            <stop offset="100%" stopColor="#060710" />
          </radialGradient>
          <linearGradient id="sol-mark" x1="0" y1="0" x2="1" y2="0.3">
            <stop offset="0%" stopColor="#9945FF" />
            <stop offset="50%" stopColor="#4B7BFF" />
            <stop offset="100%" stopColor="#14F195" />
          </linearGradient>
          <linearGradient id="sol-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C89BFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#3B82F6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#14F195" stopOpacity="0.85" />
          </linearGradient>
          <radialGradient id="sol-highlight" cx="35%" cy="25%" r="55%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="60%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id="sol-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#sol-shadow)">
          <circle cx="50" cy="50" r="46" fill="url(#sol-body)" />
          <circle cx="50" cy="50" r="46" fill="none" stroke="url(#sol-rim)" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="46" fill="url(#sol-highlight)" />

          <g transform="translate(26 36)">
            <path d="M8 0 L44 0 L38 6 L2 6 Z" fill="url(#sol-mark)" />
            <path d="M8 10 L44 10 L38 16 L2 16 Z" fill="url(#sol-mark)" opacity="0.85" />
            <path d="M8 20 L44 20 L38 26 L2 26 Z" fill="url(#sol-mark)" opacity="0.7" />
          </g>
        </g>
      </svg>
    </div>
  )
}
