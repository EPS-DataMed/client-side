import * as S from './styles'

export function TableSkeleton() {
  const numberOfRows = 5

  return (
    <S.Container data-testid="table-skeleton">
      {Array.from({ length: numberOfRows }, (_, index) => (
        <S.RowTableSkeleton key={index} />
      ))}
    </S.Container>
  )
}
