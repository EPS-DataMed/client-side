import { Control, useController } from 'react-hook-form'
import * as S from './styles'
import { Input } from '../Input'

interface TextAreaComponentProps {
  label: string
  name: string
  control: Control<any>
  required?: boolean
  description: string
  placeholder: string
  isLoading?: boolean
  defaultValue?: string
}

export const TextFieldArea: React.FC<TextAreaComponentProps> = ({
  label,
  name,
  control,
  required = false,
  description,
  placeholder,
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

  return (
    <S.FormGroup>
      <Input.Label data-test-id={`label-${name}`}>
        {label}
        {required && (
          <Input.RequiredText variant={error ? 'error' : ''}>
            *
          </Input.RequiredText>
        )}
      </Input.Label>

      <Input.Description data-test-id={`description-${name}`}>
        {description}
      </Input.Description>

      {isLoading ? (
        <S.SkeletonTextArea data-testid="skeleton-text-area" />
      ) : (
        <S.TextArea
          id={name}
          {...field}
          placeholder={placeholder}
          hasError={!!error}
          data-test-id={`text-field-${name}`}
        />
      )}

      {error && (
        <Input.ErrorMessageRoot data-test-id={`error-${name}`}>
          <Input.ErrorMessage>{error.message}</Input.ErrorMessage>
        </Input.ErrorMessageRoot>
      )}
    </S.FormGroup>
  )
}
