import React from 'react'
import { Control } from 'react-hook-form'
import { PERSONAL_INFO_FIELDS } from '../../constants'
import InputField from '../InputField'
import Section from '../Section'

interface PersonalInfoProps {
  control: Control<any>
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ control }) => (
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
      />
    ))}
  </Section>
)

export default PersonalInfo
