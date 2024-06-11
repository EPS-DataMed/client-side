import styled, { css } from 'styled-components'
import { PrimaryButton } from '../../components/PrimaryButton'

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const WrapperLogoAndLogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  padding-top: ${({ theme }) => theme.space[4]};
`
export const WrapperPageInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`
export const WrapperButton = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ButtonStyled = styled(PrimaryButton)`
  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;

      background-color: ${({ theme }) => theme.colors.neutral400} !important;
      color: ${({ theme }) => theme.colors.neutral}!important;
      font-weight: ${({ theme }) => theme.fontWeights.bold};

      &:hover {
        background-color: ${({ theme }) => theme.colors.neutral400} !important;
      }
    `}
`

export const PrintComponent = styled.div`
  visibility: hidden;
  display: none;

  @page {
    size: A4;
    margin: 0;
  }
`
