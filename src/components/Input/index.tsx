import styled, { css } from 'styled-components'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.space[1]};
`
interface InputProps {
  hasError?: boolean
  variant?: 'searchbar'
  cursor?: string
  edit?: boolean
}

const InputComponent = styled.input<InputProps>`
  height: 35px;
  background-color: inherit;
  width: 100%;

  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.neutral900};

  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.neutral400};
  padding: 0 ${({ theme }) => theme.space[4]};
  transition: all 0.3s;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue500};
  }
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue500};
  }
  &:invalid {
    border: 1px solid ${({ theme }) => theme.colors.red500};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      borborder: 1px solid ${({ theme }) => theme.colors.neutral400};
      background-color: ${({ theme }) => theme.colors.neutral100};
    `}

  ${({ hasError, theme }) =>
    hasError &&
    css`
      border: 1px solid ${theme.colors.red500};
    `}

  ${(props) =>
    props.cursor == 'not-allowed' &&
    css`
      cursor: not-allowed;
    `
  }

  ${(props) =>
    props.edit == false &&
    css`
      color: ${({ theme }) => theme.colors.neutral400};
    `

  }
  ${(props) =>
    props.variant === 'searchbar' &&
    css`
      width: 100%;
      height: 32px;
      font-size: ${({ theme }) => theme.fontSizes.sm};
      padding-left: 38px;
      padding-right: 38px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      &:hover {
        border-color: ${({ theme }) => theme.colors.blue500};
      }

      &:focus {
        border-color: ${({ theme }) => theme.colors.blue500};
      }

      &::placeholder {
        color: ${({ theme }) => theme.colors.neutral500};
      }

      &:not([value='']) {
        border-color: ${({ theme }) => theme.colors.blue500};
      }
    `}
`

const Label = styled.label`
  color: ${({ theme }) => theme.colors.neutral900};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`

const Description = styled.span`
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.space[1]};
`

interface RequiredTextProps {
  variant?: string
}

const RequiredText = styled.span<RequiredTextProps>`
  color: ${({ theme }) => theme.colors.neutral900};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.regular};

  ${({ variant }) =>
    variant === 'error' &&
    css`
      color: ${({ theme }) => theme.colors.red500};
      &:hover {
        color: ${({ theme }) => theme.colors.red500};
      }
    `}
`

const ErrorMessageRoot = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.red500};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-style: italic;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`

export const Input = {
  Root,
  Input: InputComponent,
  Label,
  RequiredText,
  ErrorMessage,
  ErrorMessageRoot,
  Description,
}
