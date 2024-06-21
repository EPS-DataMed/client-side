import { Input } from '../../../../components/Input'
import { useUserContext } from '../../../../contexts/UserContext'
import { getFormattedDate } from '../../../Signup/utils'
import * as S from './styles'

export function UserPersonalInformations() {
  const { user, isDoctor, isUserExists } = useUserContext()

  const renderInputField = (label: string, value: string) => (
    <Input.Root style={{ width: '225px' }}>
      <Input.Label>{label}</Input.Label>
      <Input.Input cursor="not-allowed" readOnly disabled value={value} />
    </Input.Root>
  )

  if (!isUserExists) {
    return Array(4)
      .fill(null)
      .map((_, index) => (
        <S.ContainerSkeleton data-testid="input-loading" key={index}>
          <S.SkeletonLabel width="225px" />
          <S.SkeletonInput width="225px" />
        </S.ContainerSkeleton>
      ))
  }

  return (
    <>
      {renderInputField('Nome', user.full_name)}
      {renderInputField('E-mail', user.email)}
      {renderInputField(
        'Sexo biológico',
        user.biological_sex === 'M' ? 'Masculino' : 'Feminino',
      )}
      {renderInputField(
        'Data de nascimento',
        getFormattedDate(user.birth_date),
      )}
      {isDoctor && (
        <>
          {renderInputField('CRM', user.doctor.crm)}
          {renderInputField('Especialidade', user.doctor.specialty)}
        </>
      )}
    </>
  )
}
