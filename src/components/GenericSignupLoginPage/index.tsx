import { styled } from 'styled-components'

export const Background = styled.div`
  display: flex;
  height: 100vh;
`

export const Image = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50vw;
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
  gap: ${({ theme }) => theme.space[4]};
`

export const Slogan = styled.p`
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
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
    LogoTitle
}