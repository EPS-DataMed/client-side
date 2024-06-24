import styled from 'styled-components'
import {
  fadeInAnimation,
  fadeOutAnimation,
} from '../../../../styles/animations'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const WrapperLottie = styled.div`
  height: 360px;
  width: 360px;
  margin-top: 4%;
`

interface MessageLoadingProps {
  fade: 'in' | 'out'
}

export const MessageLoading = styled.span<MessageLoadingProps>`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  opacity: 0;
  animation: ${({ fade }) =>
      fade === 'in' ? fadeInAnimation : fadeOutAnimation}
    0.5s forwards;
`
