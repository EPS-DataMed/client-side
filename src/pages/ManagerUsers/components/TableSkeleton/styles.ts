import { styled } from 'styled-components'
import { Skeleton } from '../../../../components/Skeleton'

export const Container = styled.div``

export const HeaderTableSkeleton = styled(Skeleton)`
  height: 70px;
  width: 100%;

  margin-top: 24px;

  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export const RowTableSkeleton = styled(Skeleton)`
  height: 86.39px;
  width: 100%;
  margin-top: 4px;
`
