import React from 'react'
import { HeightIcon } from '@radix-ui/react-icons'
import { WeightIcon } from '../../../assets/WeightIcon'
import { User } from '../../../interfaces'
import { DetailSection } from '../DetailSection'
import { Metric } from '../Metric'
import * as S from './styles'
import { IMCIcon } from '../../../assets/ImcIcon'
import { BloodIcon } from '../../../assets/BloodIcon'

export const PersonalInfoSection: React.FC<{ user: User }> = ({ user }) => (
  <S.PersonalInfo data-testid="personal-info-section">
    <S.Wrapper>
      <S.Name data-testid="user-name">{user.name}</S.Name>
      <S.Age data-testid="user-age">{user.age} anos</S.Age>
    </S.Wrapper>

    <S.MetricsContainer>
      <Metric
        label="PESO"
        value={`${user.weight}Kg`}
        icon={WeightIcon}
        data-testid="metric-peso"
      />
      <Metric
        label="ALTURA"
        value={`${user.height}m`}
        icon={HeightIcon}
        data-testid="metric-altura"
      />
      <Metric
        label="IMC"
        value={`${user.bmi}kg/m²`}
        icon={IMCIcon}
        data-testid="metric-imc"
      />
      <Metric
        label="TIPO SANGUÍNEO"
        value={user.bloodType}
        icon={BloodIcon}
        data-testid="metric-tipo sanguíneo"
      />
    </S.MetricsContainer>
    <DetailSection
      title="ALERGIAS"
      content={user.allergies}
      data-testid="detail-alergias"
    />
    <DetailSection
      title="DOENÇAS"
      content={user.diseases}
      data-testid="detail-doenças"
    />
    <DetailSection
      title="MEDICAÇÕES EM USO"
      content={user.medications}
      data-testid="detail-medicações em uso"
    />
  </S.PersonalInfo>
)
