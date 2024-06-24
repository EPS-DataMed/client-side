import React from 'react'
import * as S from './styles'

export const DetailSection: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <S.Section data-testid={`detail-${title.toLowerCase()}`}>
    <S.Title data-testid={`detail-title-${title.toLowerCase()}`}>
      {title}
    </S.Title>
    <S.Content data-testid={`detail-content-${title.toLowerCase()}`}>
      {content}
    </S.Content>
  </S.Section>
)
