import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import InputField from '.'
import AppProviders from '../../AppProviders'

interface RenderComponentProps {
  children: ReactNode
}

const RenderComponent: React.FC<RenderComponentProps> = ({ children }) => {
  const methods = useForm()
  return (
    <FormProvider {...methods}>
      <AppProviders>{children}</AppProviders>
    </FormProvider>
  )
}

test('renders input field with loading state', () => {
  const Wrapper: React.FC = () => {
    const { control } = useForm()
    return (
      <RenderComponent>
        <InputField
          label="Test Label"
          name="test"
          control={control}
          isLoading={true}
          width="200px"
        />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  expect(screen.getByTestId('input-loading')).toBeInTheDocument()
  expect(screen.getByTestId('skeleton-label')).toBeInTheDocument()
  expect(screen.getByTestId('skeleton-input')).toBeInTheDocument()
})

test('renders input field with label and description', () => {
  const Wrapper: React.FC = () => {
    const { control } = useForm()
    return (
      <RenderComponent>
        <InputField
          label="Test Label"
          name="test"
          control={control}
          description="Test description"
          required={true}
        />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  expect(screen.getByTestId('label-test')).toHaveTextContent('Test Label')
  expect(screen.getByTestId('required-test')).toHaveTextContent('*')
  expect(screen.getByTestId('description-test')).toHaveTextContent(
    'Test description',
  )
  expect(screen.getByTestId('input-field-test')).toBeInTheDocument()
})

test('renders input field with error message', () => {
  const Wrapper: React.FC = () => {
    const { control, setError } = useForm()
    React.useEffect(() => {
      setError('test', { type: 'manual', message: 'Error message' })
    }, [setError])
    return (
      <RenderComponent>
        <InputField label="Test Label" name="test" control={control} />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  expect(screen.getByTestId('error-message-test')).toHaveTextContent(
    'Error message',
  )
})

test('renders input field with mask', () => {
  const Wrapper: React.FC = () => {
    const { control } = useForm()
    return (
      <RenderComponent>
        <InputField
          label="Test Label"
          name="test"
          control={control}
          mask="999.999.999-99"
          placeholder="___.___.___-__"
        />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  const input = screen.getByTestId('input-field-test')
  expect(input).toHaveAttribute('placeholder', '___.___.___-__')
  expect(input).toBeInTheDocument()
})

test('renders input field with default value', () => {
  const Wrapper: React.FC = () => {
    const { control } = useForm({
      defaultValues: { test: 'Default Value' },
    })
    return (
      <RenderComponent>
        <InputField label="Test Label" name="test" control={control} />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  const input = screen.getByTestId('input-field-test')
  expect(input).toHaveValue('Default Value')
})

test('renders input field with custom width', () => {
  const Wrapper: React.FC = () => {
    const { control } = useForm()
    return (
      <RenderComponent>
        <InputField
          label="Test Label"
          name="test"
          control={control}
          width="250px"
        />
      </RenderComponent>
    )
  }

  render(<Wrapper />)

  const inputContainer = screen.getByTestId('input-test')
  expect(inputContainer).toHaveStyle('width: 250px')
})
