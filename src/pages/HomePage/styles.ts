
import { styled } from 'styled-components'
import { darkenColor, lightenColor } from '../../utils/colors'


export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width:100%;
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
    font-size: ${( { theme } ) => theme.fontSizes['4xl']};
    font-weight: ${( { theme } ) => theme.fontWeights.bold};

`
export const WelcomeQuestion = styled.h5`
    font-size: ${( {theme} ) => theme.fontSizes.sm};
    font-weight: ${( { theme } ) => theme.fontWeights.regular};
`

export const Options = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    gap: ${({ theme }) => theme.space[20]};
`

export const HomepageOption = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space[4]};
    padding-left: ${({ theme }) => theme.space[6]};
    padding-top: ${({ theme }) => theme.space[6]};
    padding-right: ${({ theme }) => theme.space[6]};
    width: 15vw;
    height: 100%;
    border-radius: 4px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);

    &:hover{
        outline: 2px solid ${({ theme }) => theme.colors.blue500};
        background-color: ${({ theme }) => lightenColor(theme.colors.blue440, 0.8)};
        cursor: pointer;
    }
`

export const OptionTitle = styled.h3`
    font-weight: ${( { theme } ) => theme.fontWeights.bold};
    font-size: ${( {theme} ) => theme.fontSizes.xl};
    width: 10vw;
`

export const OptionDescription = styled.p`
    font-weight: ${( { theme } ) => theme.fontWeights.regular};
    font-size: ${( {theme} ) => theme.fontSizes.xs};
`

export const ImageWrapper = styled.div`   
    flex-grow: 1;
    display: flex;
    align-items: center;
`
export const Image = styled.img`
    
    max-width: 160px; /* Limita a largura máxima da imagem */
    max-height: 160px; /* Limita a altura máxima da imagem */
    display: block; /* Remove espaços em branco ao redor da imagem */
    position: relative;
    left: 70px;
`