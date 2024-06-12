import * as S from './styles'

export const DetailSection: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => (
  <S.Section>
    <S.Title>{title}</S.Title>
    <S.Content>{content}</S.Content>
  </S.Section>
)
