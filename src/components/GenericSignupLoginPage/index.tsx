import { styled } from 'styled-components'
import { verticalAnimation } from '../../styles/animations'

export const Background = styled.div`
  display: flex;
  height: 100vh;
`

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: 50vw;
  object-fit: cover;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ theme }) => theme.space[4]};
  padding-top: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[2]};
`
export const WrapperLogoAndText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};

  svg {
    animation: ${verticalAnimation} 2s infinite;
  }
`

export const Slogan = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.space[6]};
`

export const LogoTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.blue500};
`

export const GenericSignupLoginPage = {
  Background,
  Image,
  Content,
  WrapperLogoAndText,
  Slogan,
  LogoTitle,
}
