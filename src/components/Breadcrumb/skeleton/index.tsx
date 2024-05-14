import { ArrawIcon } from '../assets/ArrowIcon'
import * as S from './styles'

export function BreadcrumbsSkeleton() {
  return (
    <S.Container>
      <S.LabelSkeleton />
      <ArrawIcon />
      <S.LabelSkeleton />
    </S.Container>
  )
}
