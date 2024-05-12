import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

interface LabelProps {
  activate?: boolean
}

export const Label = styled.label<LabelProps>`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral600};

  ${({ activate }) =>
    activate &&
    css`
      color: ${({ theme }) => theme.colors.neutral900};
      font-weight: ${({ theme }) => theme.fontWeights.bold};
    `}

  ${({ activate }) =>
    !activate &&
    css`
      cursor: pointer;
    `}
`
