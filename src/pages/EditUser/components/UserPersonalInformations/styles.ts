import styled from 'styled-components'
import { Skeleton } from '../../../../components/Skeleton'

interface SkeletonInputProps {
  width: string | undefined
}

export const ContainerSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const SkeletonInput = styled(Skeleton)<SkeletonInputProps>`
  border-radius: 4px;
  height: 35px;
  width: ${(props) => props.width || '100%'};
`

export const SkeletonLabel = styled(Skeleton)<SkeletonInputProps>`
  border-radius: 4px;
  height: 19px;
  width: ${(props) => props.width || '100%'};
`
