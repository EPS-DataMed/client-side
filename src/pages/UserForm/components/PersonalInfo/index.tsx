import React from 'react'
import { Control } from 'react-hook-form'
import { PERSONAL_INFO_FIELDS } from '../../constants'
import Section from '../Section'
import InputField from '../../../../components/Input/InputField'
import { useUserContext } from '../../../../contexts/UserContext'
import { useSubmissionTestContext } from '../../../../contexts/SubmissionTestContext'

interface PersonalInfoProps {
  control: Control<any>
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ control }) => {
  const { isUserExists } = useUserContext()
  const { formUserFields, hasFormData } = useSubmissionTestContext()
  const isLoading = !isUserExists && !hasFormData

  return (
    <Section title="Seção 01: Informações Pessoais">
      {PERSONAL_INFO_FIELDS.map((field) => (
        <InputField
          key={field.name}
          name={field.name}
          label={field.label}
          placeholder={field.placeholder}
          description={field.description}
          control={control}
          required={field.required}
          disabled={field.name === 'bmi'}
          width="225px"
          isLoading={isLoading}
          defaultValue={
            formUserFields?.personalInfo.find(
              (info) => info.name === field.name,
            )?.value
          }
        />
      ))}
    </Section>
  )
}

export default PersonalInfo
