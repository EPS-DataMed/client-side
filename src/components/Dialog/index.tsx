import styled, { keyframes } from 'styled-components'
import * as DialogRadix from '@radix-ui/react-dialog'

const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`

const animationDuration = '150ms'
const animationTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)'

const Root = styled(DialogRadix.Root)``

const Trigger = styled(DialogRadix.Trigger)``

const Portal = styled(DialogRadix.Portal)``

const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background-color: rgba(217, 217, 217, 0.4);
  z-index: 999998;
  animation: ${overlayShow} ${animationDuration} ${animationTimingFunction};
`

const Content = styled(DialogRadix.Content)`
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.space[6]};
  background: ${({ theme }) => theme.colors.neutral};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999999;
  animation: ${contentShow} ${animationDuration} ${animationTimingFunction};
  @media (max-width: 768px) {
    min-width: 90vw;
    max-width: 90vw;
    padding: 2rem;
  }
`

const Close = styled(DialogRadix.Close)``
const Title = styled(DialogRadix.Title)`
  color: ${({ theme }) => theme.colors.neutral900};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin: 0;
`

const Description = styled(DialogRadix.Description)`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.neutral900};
`

const CloseIconButton = styled(DialogRadix.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.9rem;
  right: 1.5rem;
  line-height: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutral900};
  z-index: 100;
`

export const Dialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
  Title,
  Description,
  CloseIconButton,
}
