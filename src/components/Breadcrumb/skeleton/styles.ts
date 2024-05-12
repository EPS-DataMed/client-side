import styled from 'styled-components'
import { Skeleton } from '../../Skeleton'

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`

export const LabelSkeleton = styled(Skeleton)`
  height: 19px;
  width: 80px;
  border-radius: 8px;
`
