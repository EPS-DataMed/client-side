import React from 'react'
import * as S from './styles'

export const Metric: React.FC<{
  label: string
  value: string
  icon: React.ElementType
}> = ({ label, value, icon: Icon }) => (
  <S.MetricContainer data-testid={`metric-${label.toLowerCase()}`}>
    <span data-testid={`metric-label-${label.toLowerCase()}`}>{label}</span>
    <S.Wrapper>
      <Icon data-testid={`metric-icon-${label.toLowerCase()}`} />
      <p data-testid={`metric-value-${label.toLowerCase()}`}>{value}</p>
    </S.Wrapper>
  </S.MetricContainer>
)
