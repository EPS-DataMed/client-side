import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'

export const SignupFieldsForm = styled.form`
  display: flex;
  width: 365px;
  height: 340px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: ${({ theme }) => theme.space[2]};

  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

  margin-bottom: ${({ theme }) => theme.space[4]};

  @media (min-width: 1604px) {
    overflow: hidden;
    height: auto;
  }
`

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
`

export const SignupProgress = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  padding: ${({ theme }) => theme.space[4]};
`
export const BlueProgressCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue500};
`

export const GreyProgressCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.neutral300};
`
export const SignupInstruction = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.neutral600};
  width: 365px;
  margin-bottom: ${({ theme }) => theme.space[6]};
`

export const ForwardButtonWrapper = styled.div`
  width: 365px;
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
  justify-content: center;
`

export const RegisterArea = styled.div`
  align-self: center;
  margin-top: ${({ theme }) => theme.space[8]};
`

export const RegisterPhrase = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutral900};
`

export const Link = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.blue500};

  &:hover {
    color: ${({ theme }) => darkenColor(theme.colors.blue500, 0.1)};
    cursor: pointer;
  }
`
