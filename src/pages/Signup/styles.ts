import { styled, css } from 'styled-components'

export const SignupFieldsForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 340px;
  width: 365px;
  gap: ${({ theme }) => theme.space[4]};
  overflow-y: scroll;
  padding-right: ${({ theme }) => theme.space[2]};
  overflow-x: hidden;
  margin-bottom: ${({ theme }) => theme.space[4]};
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
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ theme }) => theme.colors.neutral600};
  width: 365px;
`

export const ForwardButtonWrapper = styled.div`
  width: 365px;
  display: flex;
  justify-content: center;
`
interface SelectProps {
  hasError?: boolean
}

export const SexInput = styled.select<SelectProps>`
  height: 35px;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0 16px;
  background-color: inherit;
  border: 1px solid ${({ theme }) => theme.colors.neutral600};
  ${({ hasError, theme }) =>
    hasError &&
    css`
      border: 1px solid ${theme.colors.red500};
    `}
`

export const SpecialtyInput = styled.select<SelectProps>`
  height: 35px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.neutral600};
  ${({ hasError, theme }) =>
    hasError &&
    css`
      border: 1px solid ${theme.colors.red500};
    `}
`
