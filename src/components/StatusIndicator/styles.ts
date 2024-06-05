import { styled } from 'styled-components'

export const DotsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[4]};
`

interface DotProps {
  active: boolean
}

export const Dot = styled.div<DotProps>`
  width: 8px;
  height: 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.blue500 : theme.colors.neutral400};
  transition: background-color 0.3s ease;
`
