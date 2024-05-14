import { keyframes } from 'styled-components'

export const slideAnimation = keyframes`
  0% {
    transform: translateX(0); 
  }
  50% {
    transform: translateX(10px); 
  }
  100% {
    transform: translateX(0); 
  }
`

export const verticalAnimation = keyframes`
  0%, 100% {
    transform: translateY(0); 
  }
  50% {
    transform: translateY(-4px); 
  }
  75% {
    transform: translateY(4px);
  }
`

export const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg); 
  }
  100% {
    transform: rotate(360deg); 
  }
`

export const scaleAnimation = keyframes`
  0%, 100% {
    transform: scale(1); 
  }
  25% {
    transform: scale(1.04); 
  }

`

export const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
