import { styled } from 'styled-components'
import { lightenColor } from '../../utils/colors'

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const WrapperLogoAndLogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
`
export const WelcomeText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`
export const WelcomeQuestion = styled.h5`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`

export const Options = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  margin-top: 1%;
  gap: 148px;
`

export const HomepageOption = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[10]};
  width: 300px;
  height: 480px;
  border-radius: 4px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
  transition: outline 0.3s, background-color 0.3s, transform 0.3s;

  img {
    transition: filter 0.3s, transform 0.3s;
  }

  &:hover {
    outline: 2px solid ${({ theme }) => theme.colors.blue500};
    background-color: ${({ theme }) => lightenColor(theme.colors.blue440, 0.8)};
    cursor: pointer;

    img {
      filter: brightness(1.1);
      transform: scale(1.1);
    }
  }
`

export const OptionTitle = styled.h3`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  width: 20px;
`

export const OptionDescription = styled.p`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
`

export const ImageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`
export const Image = styled.img`
  max-width: 296px;
  max-height: 296px;
  display: block;
  position: relative;
  left: 10%;
`
