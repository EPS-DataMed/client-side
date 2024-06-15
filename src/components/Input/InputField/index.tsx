import React from 'react'
import { useController, Control } from 'react-hook-form'
import { Input } from '..'

interface InputFieldProps {
  label: string
  name: string
  control: Control<any>
  placeholder?: string
  description?: string
  required?: boolean
  type?: string
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  control,
  placeholder = '',
  description,
  required = false,
  type = 'text',
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: '',
  })

  return (
    <Input.Root>
      <Input.Label htmlFor={name}>
        {label}
        {required && (
          <Input.RequiredText variant={error ? 'error' : ''}>
            *
          </Input.RequiredText>
        )}
      </Input.Label>
      {description && <Input.Description>{description}</Input.Description>}
      <Input.Input
        {...field}
        id={name}
        type={type}
        placeholder={placeholder}
        hasError={Boolean(error)}
      />
      {error && (
        <Input.ErrorMessageRoot>
          <Input.ErrorMessage>{error.message}</Input.ErrorMessage>
        </Input.ErrorMessageRoot>
      )}
    </Input.Root>
  )
}

export default InputField
