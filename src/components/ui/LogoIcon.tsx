interface LogoIconProps {
  className?: string;
  size?: number;
}

export function LogoIcon({ className = '', size = 20 }: LogoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#3B82F6' }} />
          <stop offset="50%" style={{ stopColor: '#8B5CF6' }} />
          <stop offset="100%" style={{ stopColor: '#EC4899' }} />
        </linearGradient>
        <linearGradient id="logo-s" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#60A5FA' }} />
          <stop offset="50%" style={{ stopColor: '#A78BFA' }} />
          <stop offset="100%" style={{ stopColor: '#F472B6' }} />
        </linearGradient>
        <radialGradient id="logo-r" cx="40%" cy="35%" r="50%">
          <stop offset="0%" style={{ stopColor: '#93C5FD', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#8B5CF6', stopOpacity: 0.3 }} />
        </radialGradient>
      </defs>
      {/* Shield */}
      <path
        d="M32 4C32 4 8 14 8 14C8 14 8 34 8 38C8 50 32 60 32 60C32 60 56 50 56 38C56 34 56 14 56 14C56 14 32 4 32 4Z"
        fill="url(#logo-g)"
      />
      {/* Highlight */}
      <path
        d="M32 4C32 4 8 14 8 14C8 14 8 24 8 24C32 19 56 24 56 24C56 24 56 14 56 14Z"
        fill="white"
        opacity="0.2"
      />
      {/* Sphere */}
      <circle cx="32" cy="30" r="10" fill="url(#logo-s)" opacity="0.9" />
      <circle cx="32" cy="30" r="10" fill="url(#logo-r)" />
      {/* Specular */}
      <ellipse cx="30" cy="27" rx="4.5" ry="3" fill="white" opacity="0.35" />
    </svg>
  );
}
