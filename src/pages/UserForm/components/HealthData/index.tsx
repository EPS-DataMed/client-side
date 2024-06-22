import React from 'react'
import { Control } from 'react-hook-form'
import Section from '../Section'
import {
  HEMOGRAM_FIELDS,
  HEPATIC_FUNCTION_FIELDS,
  RENAL_FUNCTION_FIELDS,
} from '../../constants'
import * as S from './styles'
import InputField from '../../../../components/Input/InputField'
import { useUserContext } from '../../../../contexts/UserContext'
import { useSubmissionTestContext } from '../../../../contexts/SubmissionTestContext'

interface HealthDataProps {
  control: Control<any>
}
const HealthData: React.FC<HealthDataProps> = ({ control }) => {
  const { isUserExists } = useUserContext()
  const { formUserFields, hasFormData } = useSubmissionTestContext()
  const isLoading = !isUserExists && !hasFormData

  return (
    <Section hasVerticalOrientation title="Seção 02: Dados de saúde">
      <h3>Hemograma</h3>
      <S.Container>
        {HEMOGRAM_FIELDS.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            description={field.description}
            control={control}
            required={field.required}
            width="225px"
            isLoading={isLoading}
            defaultValue={
              formUserFields?.hemogram.find((info) => info.name === field.name)
                ?.value
            }
          />
        ))}
      </S.Container>
      <S.Divider />
      <h3>Função Hepática</h3>
      <S.Container>
        {HEPATIC_FUNCTION_FIELDS.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            description={field.description}
            control={control}
            required={field.required}
            width="225px"
            isLoading={isLoading}
            defaultValue={
              formUserFields?.hepaticFunction.find(
                (info) => info.name === field.name,
              )?.value
            }
          />
        ))}
      </S.Container>
      <S.Divider />

      <h3>Função Renal</h3>
      <S.Container>
        {RENAL_FUNCTION_FIELDS.map((field) => (
          <InputField
            key={field.name}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            description={field.description}
            control={control}
            required={field.required}
            width="225px"
            isLoading={isLoading}
            defaultValue={
              formUserFields?.renalFunction.find(
                (info) => info.name === field.name,
              )?.value
            }
          />
        ))}
      </S.Container>
    </Section>
  )
}

export default HealthData
