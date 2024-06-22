import React from 'react'
import { Control } from 'react-hook-form'
import Section from '../Section'
import { ADDITIONAL_INFO_FIELDS } from '../../constants'
import { TextFieldArea } from '../../../../components/TextFieldArea'
import { useUserContext } from '../../../../contexts/UserContext'
import { useSubmissionTestContext } from '../../../../contexts/SubmissionTestContext'

interface AdditionalInfoProps {
  control: Control<any>
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ control }) => {
  const { isUserExists } = useUserContext()
  const { formUserFields, hasFormData } = useSubmissionTestContext()
  const isLoading = !isUserExists && !hasFormData

  return (
    <Section hasVerticalOrientation title="Seção 03: Informações adicionais">
      {ADDITIONAL_INFO_FIELDS.map((field) => (
        <TextFieldArea
          key={field.name}
          name={field.name}
          label={field.label}
          control={control}
          required={field.required}
          description={field.description}
          placeholder={field.placeholder}
          isLoading={isLoading}
          defaultValue={
            formUserFields?.renalFunction.find(
              (info) => info.name === field.name,
            )?.value
          }
        />
      ))}
    </Section>
  )
}

export default AdditionalInfo
