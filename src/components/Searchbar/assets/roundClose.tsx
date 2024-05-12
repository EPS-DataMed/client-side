import React, { SVGProps } from 'react'

export const RoundCloseIcon: React.FC<SVGProps<SVGSVGElement>> = ({
  width = '16',
  height = '16',
  fill = '#2980B9',
  ...props
}) => (
  <>
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="&#240;&#159;&#166;&#134; icon &#34;close circle&#34;">
        <path
          id=""
          d="M7 0C3.143 0 0 3.143 0 7C0 10.857 3.143 14 7 14C10.857 14 14 10.857 14 7C14 3.143 10.857 0 7 0ZM9.352 8.61C9.555 8.813 9.555 9.149 9.352 9.352C9.247 9.457 9.114 9.506 8.981 9.506C8.848 9.506 8.715 9.457 8.61 9.352L7 7.742L5.39 9.352C5.285 9.457 5.152 9.506 5.019 9.506C4.886 9.506 4.753 9.457 4.648 9.352C4.445 9.149 4.445 8.813 4.648 8.61L6.258 7L4.648 5.39C4.445 5.187 4.445 4.851 4.648 4.648C4.851 4.445 5.187 4.445 5.39 4.648L7 6.258L8.61 4.648C8.813 4.445 9.149 4.445 9.352 4.648C9.555 4.851 9.555 5.187 9.352 5.39L7.742 7L9.352 8.61Z"
          fill={fill}
        />
      </g>
    </svg>
  </>
)
