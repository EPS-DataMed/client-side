import { styled } from 'styled-components'
import { PrimaryButton } from '../../components/PrimaryButton'
import { fadeInAnimation, scaleAnimation } from '../../styles/animations'

export const WrapperLogoAndLogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`
export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[12]};
  padding-top: ${({ theme }) => theme.space[4]};
`

export const WrapperPageInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

export const WrrapperBoxes = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${fadeInAnimation} 0.5s linear;
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[5]};
`

export const Description = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const UploadedDocumentsContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.space[6]};
`

export const WrapperInformations = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
  z-index: 3;
`

export const AdvanceButton = styled(PrimaryButton)`
  align-self: flex-end;
  animation: ${scaleAnimation} 1s infinite;
  z-index: 2;
`
