import { css, styled } from 'styled-components'
import { darkenColor, lightenColor } from '../../utils/colors'

interface ButtonProps {
  variant?: 'secondary' | 'primary'
}

const secondaryButtonStyle = css`
  background-color: inherit;
  text-align: center !important;
  color: ${({ theme }) => theme.colors.neutral600} !important;
  border: 1px solid ${({ theme }) => theme.colors.neutral600} !important;
  font-weight: ${({ theme }) => theme.fontWeights.medium} !important;

  &:hover {
    background-color: inherit !important;
    color: ${({ theme }) => theme.colors.neutral900} !important;
    font-weight: ${({ theme }) => theme.fontWeights.medium} !important;
    border: 1px solid
      ${({ theme }) => lightenColor(theme.colors.neutral600, 0.2)} !important;
  }
`

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.xs};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.blue500};
  padding: 0.5rem 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral};
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
  text-decoration: none;
  align-items: center;

  ${({ variant }) => variant === 'secondary' && secondaryButtonStyle}

  &:hover {
    background-color: ${({ theme }) => darkenColor(theme.colors.blue500, 0.2)};
    color: ${({ theme }) => theme.colors.neutral};
  }

  ${({ disabled, variant }) =>
    variant === 'primary' &&
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.neutral400};
      cursor: not-allowed;
      color: white;

      &:hover {
        background-color: ${({ theme }) => theme.colors.neutral400};
        color: white;
        svg {
          path {
            fill: ${({ theme }) => theme.colors.neutral};
          }
        }
      }
    `}
`
