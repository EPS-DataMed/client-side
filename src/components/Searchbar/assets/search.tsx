import React, { SVGProps } from 'react'

export const SearchIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  width = '14',
  height = '14',
  fill = '#292929',
  ...props
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="search"
      d="M12.5025 10.9998C12.1585 10.6703 11.8237 10.3313 11.4985 9.98332C11.2253 9.7057 11.0608 9.50373 11.0608 9.50373L9.0043 8.52177C9.82761 7.58802 10.282 6.386 10.2822 5.14112C10.2822 2.30689 7.97608 0 5.14112 0C2.30616 0 0 2.30689 0 5.14112C0 7.97534 2.30616 10.2822 5.14112 10.2822C6.43595 10.2822 7.6162 9.7975 8.52177 9.00504L9.50373 11.0615C9.50373 11.0615 9.7057 11.226 9.98332 11.4992C10.2676 11.7658 10.6414 12.1264 10.9998 12.5032L11.9972 13.5255L12.4408 14L13.9985 12.4422L13.5241 11.9986C13.2457 11.7254 12.8741 11.3626 12.5025 10.9998ZM5.14112 8.81335C3.11625 8.81335 1.46889 7.16598 1.46889 5.14112C1.46889 3.11625 3.11625 1.46889 5.14112 1.46889C7.16599 1.46889 8.81335 3.11625 8.81335 5.14112C8.81335 7.16598 7.16599 8.81335 5.14112 8.81335Z"
      fill={fill}
    />
  </svg>
)