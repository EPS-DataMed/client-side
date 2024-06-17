import styled from 'styled-components'
import { Skeleton } from '../Skeleton'

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

export const TextArea = styled.textarea<{ hasError: boolean }>`
  width: 100%;
  padding: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  box-sizing: border-box;
  height: 86px;
  background-color: transparent;
  border-color: ${({ theme }) => theme.colors.neutral400};
  border-radius: ${({ theme }) => theme.radii.xs};
  resize: none;
  border-color: ${({ theme, hasError }) =>
    hasError ? theme.colors.red500 : theme.colors.neutral400};
`

export const SkeletonTextArea = styled(Skeleton)`
  width: 100%;
  height: 86px;
`
