import styled from 'styled-components'
import { Skeleton } from '../../components/Skeleton'

export const WrapperButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};

  margin-top: ${({ theme }) => theme.space[2]};
  width: 364px;
`

export const SkeletonMessage = styled(Skeleton)`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  margin-bottom: 1.5rem;
`
