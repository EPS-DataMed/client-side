import { keyframes, styled } from 'styled-components'

const bacteriaMovement = keyframes`
  0%, 100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(1px, -1px);
  }
  75% {
    transform: translate(0px, 1px);
  }
`

const AnimatedCircle = styled.circle`
  fill: #53bc62;
  animation: ${bacteriaMovement} 3s infinite ease-in-out;
`

export function CheckIcon() {
  return (
    <svg
      width="174"
      height="184"
      viewBox="0 0 174 184"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M141.167 93.9583C141.167 124.105 116.73 148.542 86.5833 148.542C56.438 148.542 32 124.105 32 93.9583C32 63.813 56.438 39.375 86.5833 39.375C116.73 39.375 141.167 63.813 141.167 93.9583Z"
        fill="#069B1C"
      />
      <path
        d="M141.167 88.4998C141.167 118.646 116.73 143.083 86.5833 143.083C56.438 143.083 32 118.646 32 88.4998C32 58.3546 56.438 33.9165 86.5833 33.9165C116.73 33.9165 141.167 58.3546 141.167 88.4998Z"
        fill="#21A635"
      />
      <path
        d="M108.417 72.125L75.6667 104.875L62.0208 91.2292L50.4219 102.692L64.0677 116.337L74.9844 127.254L75.6667 127.8L120.016 83.5874L108.417 72.125Z"
        fill="#27AE60"
      />
      <path
        d="M108.417 66.6665L75.6667 99.4165L62.0208 85.7707L50.4219 97.233L64.0677 110.879L74.9844 121.796L75.6667 122.341L120.016 78.1289L108.417 66.6665Z"
        fill="#F9F9F9"
      />
      <AnimatedCircle cx="7.5" cy="90.5" r="7.5" fill="#53BC62" />
      <AnimatedCircle cx="78" cy="9" r="9" fill="#53BC62" />
      <AnimatedCircle cx="43" cy="24" r="9" fill="#53BC62" />
      <AnimatedCircle cx="19.5" cy="38.5" r="4.5" fill="#53BC62" />
      <AnimatedCircle cx="64.5" cy="28.5" r="4.5" fill="#53BC62" />
      <AnimatedCircle cx="29.5" cy="53.5" r="4.5" fill="#53BC62" />
      <AnimatedCircle cx="15.5" cy="69.5" r="4.5" fill="#53BC62" />
      <circle
        cx="9"
        cy="9"
        r="9"
        transform="matrix(1 0 0 -1 69 184)"
        fill="#53BC62"
      />
      <circle
        cx="9"
        cy="9"
        r="9"
        transform="matrix(1 0 0 -1 34 169)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(1 0 0 -1 15 150)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(1 0 0 -1 60 160)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(1 0 0 -1 25 135)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(1 0 0 -1 11 119)"
        fill="#53BC62"
      />
      <circle
        cx="166.5"
        cy="93.5"
        r="7.5"
        transform="rotate(180 166.5 93.5)"
        fill="#53BC62"
      />
      <circle
        cx="98.5"
        cy="174.5"
        r="4.5"
        transform="rotate(180 98.5 174.5)"
        fill="#53BC62"
      />
      <circle
        cx="131"
        cy="160"
        r="9"
        transform="rotate(180 131 160)"
        fill="#53BC62"
      />
      <circle
        cx="154.5"
        cy="145.5"
        r="4.5"
        transform="rotate(180 154.5 145.5)"
        fill="#53BC62"
      />
      <circle
        cx="109.5"
        cy="155.5"
        r="4.5"
        transform="rotate(180 109.5 155.5)"
        fill="#53BC62"
      />
      <circle
        cx="144.5"
        cy="130.5"
        r="4.5"
        transform="rotate(180 144.5 130.5)"
        fill="#53BC62"
      />
      <circle
        cx="158.5"
        cy="114.5"
        r="4.5"
        transform="rotate(180 158.5 114.5)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(-1 0 0 1 103 6)"
        fill="#53BC62"
      />
      <circle
        cx="9"
        cy="9"
        r="9"
        transform="matrix(-1 0 0 1 140 15)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(-1 0 0 1 159 34)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(-1 0 0 1 114 24)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(-1 0 0 1 149 49)"
        fill="#53BC62"
      />
      <circle
        cx="4.5"
        cy="4.5"
        r="4.5"
        transform="matrix(-1 0 0 1 163 65)"
        fill="#53BC62"
      />
    </svg>
  )
}
