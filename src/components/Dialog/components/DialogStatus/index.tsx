import styled from 'styled-components'
import { AnimatedCheckIcon } from './components/AnimatedCheckIcon'
import { ErrorIcon } from '../../icons/ErrorIcon'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 268px;
  align-items: center;
  justify-content: center;

  svg {
    g {
      path {
        transform: scale(1.6);
      }
    }
  }
`

const Title = styled.h2`
  position: relative;
  bottom: 10px;
  color: ${({ theme }) => theme.colors.neutral700};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin: 0;
`

const Description = styled.span`
  color: ${({ theme }) => theme.colors.neutral900};
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-family: ${({ theme }) => theme.fonts.primary};
  text-align: center;
`

const ErrorDialogIcon = styled(ErrorIcon)`
  width: 84px;
  height: 84px;
`

export const DialogStatus = {
  Root,
  Title,
  Description,
  ErrorDialogIcon,
  AnimatedCheckIcon,
}
