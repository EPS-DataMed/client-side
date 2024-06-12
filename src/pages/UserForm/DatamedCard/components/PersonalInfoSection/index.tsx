import { HeightIcon } from '@radix-ui/react-icons'
import { WeightIcon } from '../../../assets/WeightIcon'
import { User } from '../../../interfaces'
import { DetailSection } from '../DetailSection'
import { Metric } from '../Metric'
import * as S from './styles'
import { IMCIcon } from '../../../assets/ImcIcon'
import { BloodIcon } from '../../../assets/BloodIcon'

export const PersonalInfoSection: React.FC<{ user: User }> = ({ user }) => (
  <S.PersonalInfo>
    <S.Wrapper>
      <S.Name>{user.name}</S.Name>
      <S.Age>{user.age} anos</S.Age>
    </S.Wrapper>

    <S.MetricsContainer>
      <Metric label="PESO" value={`${user.weight}Kg`} icon={WeightIcon} />
      <Metric label="ALTURA" value={`${user.height}m`} icon={HeightIcon} />
      <Metric label="IMC" value={`${user.bmi}kg/m²`} icon={IMCIcon} />
      <Metric label="TIPO SANGUÍNEO" value={user.bloodType} icon={BloodIcon} />
    </S.MetricsContainer>
    <DetailSection title="ALERGIAS" content={user.allergies} />
    <DetailSection title="DOENÇAS" content={user.diseases} />
    <DetailSection title="MEDICAÇÕES EM USO" content={user.medications} />
  </S.PersonalInfo>
)
