import React from 'react'
import * as S from './styles'

interface StatusIndicatorProps {
  currentStep: number
}
export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <S.DotsContainer>
      {[...Array(3)].map((_, index) => (
        <S.Dot key={index} active={currentStep === index + 1} />
      ))}
    </S.DotsContainer>
  )
}
