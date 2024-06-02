import React from 'react';
import * as S from './styles'

interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = () => {
  return (
    <S.CardContainer>

      <S.CardContentHeader>
        <S.CardTitle>Elvis Presley</S.CardTitle>
        <S.TitleItem>40 anos</S.TitleItem>
      </S.CardContentHeader>

      <S.CardContentMainInformation>
        <S.TitleItem>Peso</S.TitleItem>
        <S.ItemIcon></S.ItemIcon>

        <S.TitleItem>Altura</S.TitleItem>
        <S.ItemIcon></S.ItemIcon>

        <S.TitleItem>IMC</S.TitleItem>
        <S.ItemIcon></S.ItemIcon>

        <S.TitleItem>Tipo sanguíneo</S.TitleItem>
        <S.ItemIcon></S.ItemIcon>
      </S.CardContentMainInformation>

      <S.CardContentSecondaryInformation>
        <S.TitleItem>Alergias</S.TitleItem>
        <S.DescriptionSecondaryInformation></S.DescriptionSecondaryInformation>
        
        <S.TitleItem>Doenças</S.TitleItem>
        <S.DescriptionSecondaryInformation></S.DescriptionSecondaryInformation>

        <S.TitleItem>Medicações em uso</S.TitleItem>
        <S.DescriptionSecondaryInformation></S.DescriptionSecondaryInformation>
      </S.CardContentSecondaryInformation>

    </S.CardContainer>
  );
};

export default Card;
