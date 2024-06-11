import * as S from './styles'

export const Metric: React.FC<{
  label: string
  value: string
  icon: React.ElementType
}> = ({ label, value, icon: Icon }) => (
  <S.MetricContainer>
    <span>{label}</span>
    <S.Wrapper>
      <Icon />
      <p>{value}</p>
    </S.Wrapper>
  </S.MetricContainer>
)
