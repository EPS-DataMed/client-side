/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React from 'react'
import { useController, Control } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { Input } from '..'
import styled from 'styled-components'
import { Skeleton } from '../../Skeleton'

interface SkeletonInputProps {
  width: string | undefined
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const SkeletonInput = styled(Skeleton)<SkeletonInputProps>`
  border-radius: 4px;
  height: 35px;
  width: ${(props) => props.width || '100%'};
`

const SkeletonLabel = styled(Skeleton)<SkeletonInputProps>`
  border-radius: 4px;
  height: 19px;
  width: ${(props) => props.width || '100%'};
`

interface InputFieldProps {
  label: string
  name: string
  control: Control<any>
  placeholder?: string
  description?: string
  required?: boolean
  disabled?: boolean
  type?: string
  mask?: string
  width?: string
  isLoading?: boolean
  defaultValue?: any
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  control,
  placeholder = '',
  description,
  required = false,
  type = 'text',
  mask,
  disabled = false,
  width,
  isLoading = false,
  defaultValue = '',
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  })

  const style = width ? { width } : undefined

  if (isLoading) {
    return (
      <Container data-testid="input-loading">
        <SkeletonLabel width={width} data-testid="skeleton-label" />
        <SkeletonInput width={width} data-testid="skeleton-input" />
      </Container>
    )
  }

  return (
    <Input.Root style={style} data-testid={`input-${name}`}>
      <Input.Label htmlFor={name} data-testid={`label-${name}`}>
        {label}
        {required && (
          <Input.RequiredText
            variant={error ? 'error' : ''}
            data-testid={`required-${name}`}
          >
            *
          </Input.RequiredText>
        )}
      </Input.Label>
      {description && (
        <Input.Description data-testid={`description-${name}`}>
          {description}
        </Input.Description>
      )}
      {mask ? (
        <InputMask
          {...field}
          mask={mask}
          maskChar={null}
          placeholder={placeholder}
          disabled={disabled}
        >
          {(inputProps) => (
            <Input.Input
              {...inputProps}
              id={name}
              type={type}
              hasError={Boolean(error)}
              disabled={disabled}
              data-testid={`input-field-${name}`}
            />
          )}
        </InputMask>
      ) : (
        <Input.Input
          {...field}
          id={name}
          type={type}
          placeholder={placeholder}
          hasError={Boolean(error)}
          disabled={disabled}
          data-testid={`input-field-${name}`}
        />
      )}
      {error && (
        <Input.ErrorMessageRoot data-testid={`error-root-${name}`}>
          <Input.ErrorMessage data-testid={`error-message-${name}`}>
            {error.message}
          </Input.ErrorMessage>
        </Input.ErrorMessageRoot>
      )}
    </Input.Root>
  )
}

export default InputField
