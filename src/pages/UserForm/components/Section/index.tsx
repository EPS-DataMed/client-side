import React from 'react'
import * as S from './styles'

interface SectionProps {
  title: string
  children: React.ReactNode
  hasVerticalOrientation?: boolean
}

const Section: React.FC<SectionProps> = ({
  title,
  children,
  hasVerticalOrientation = false,
}) => (
  <S.Container>
    <S.SectionTitle>{title}</S.SectionTitle>
    <S.Divider />
    <S.SectionWrapperInputs hasVerticalOrientation={hasVerticalOrientation}>
      {children}
    </S.SectionWrapperInputs>
  </S.Container>
)

export default Section
