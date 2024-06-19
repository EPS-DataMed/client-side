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
}

export const TextFieldArea: React.FC<TextAreaComponentProps> = ({
  label,
  name,
  control,
  required = false,
  description,
  placeholder,
  isLoading = false,
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
    <S.FormGroup>
      <Input.Label>
        {label}
        {required && (
          <Input.RequiredText variant={error ? 'error' : ''}>
            *
          </Input.RequiredText>
        )}
      </Input.Label>

      <Input.Description>{description}</Input.Description>

      {isLoading ? (
        <S.SkeletonTextArea />
      ) : (
        <S.TextArea
          id={name}
          {...field}
          placeholder={placeholder}
          hasError={!!error}
          data-testid={`text-field-${name}`}
        />
      )}

      {error && (
        <Input.ErrorMessageRoot>
          <Input.ErrorMessage>{error.message}</Input.ErrorMessage>
        </Input.ErrorMessageRoot>
      )}
    </S.FormGroup>
  )
}
