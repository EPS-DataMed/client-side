import React from 'react'

interface LogoSVGProps {
  width?: string
  height?: string
  onClick?: () => void
}

export const LogoSVG: React.FC<LogoSVGProps> = ({
  width = '61',
  height = '57',
  onClick,
  ...rest
}) => {
  return (
    <svg
      width={width}
      height={height}
      data-testid="logo-icon"
      viewBox="0 0 61 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      {...rest}
    >
      <path
        d="M57.5 24.5C57.5 37.7021 45.4676 48.5 30.5 48.5C15.5324 48.5 3.5 37.7021 3.5 24.5C3.5 11.2979 15.5324 0.5 30.5 0.5C45.4676 0.5 57.5 11.2979 57.5 24.5Z"
        fill="#2980B9"
        stroke="#2980B9"
      />
      <g filter="url(#filter0_d_213_317)">
        <ellipse cx="30.5" cy="24.5" rx="26.5" ry="24.5" fill="#F9F9F9" />
      </g>
      <path
        d="M50 13.5597C50 19.4713 38.026 44 31 44C23.974 44 12 19.4713 12 13.5597C12 7.64813 23.974 7 31 7C38.026 7 50 7.64813 50 13.5597Z"
        fill="#2980B9"
      />
      <rect x="17" y="16.4" width="27" height="4.97391" fill="white" />
      <rect
        x="33.2002"
        y="6"
        width="26"
        height="5.16522"
        transform="rotate(90 33.2002 6)"
        fill="white"
      />
      <ellipse cx="30.5" cy="4" rx="2.5" ry="3" fill="#2980B9" />
      <ellipse cx="30.5" cy="4" rx="1.5" ry="1" fill="white" />
      <defs>
        <filter
          id="filter0_d_213_317"
          x="0"
          y="0"
          width="61"
          height="57"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_213_317"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_213_317"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}
