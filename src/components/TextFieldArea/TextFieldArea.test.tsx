import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider, useController } from 'react-hook-form'
import { TextFieldArea } from './'
import AppProviders from '../AppProviders'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useController: jest.fn(),
}))

const renderWithFormProvider = (component: React.ReactElement) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm()
    return (
      <FormProvider {...methods}>
        <AppProviders>{children}</AppProviders>
      </FormProvider>
    )
  }
  return render(component, { wrapper: Wrapper })
}

describe('TextFieldArea', () => {
  const defaultProps = {
    label: 'Test Label',
    name: 'testName',
    control: {} as any,
    description: 'Test Description',
    placeholder: 'Test Placeholder',
  }

  beforeEach(() => {
    ;(useController as jest.Mock).mockReturnValue({
      field: { value: '', onChange: jest.fn(), onBlur: jest.fn() },
      fieldState: { error: undefined },
    })
  })

  test('should render label and description', () => {
    renderWithFormProvider(<TextFieldArea {...defaultProps} />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  test('should render required indicator when required', () => {
    renderWithFormProvider(<TextFieldArea {...defaultProps} required />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('should render textarea with placeholder', () => {
    renderWithFormProvider(<TextFieldArea {...defaultProps} />)
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
  })

  test('should render skeleton loader when isLoading is true', () => {
    renderWithFormProvider(<TextFieldArea {...defaultProps} isLoading />)
    expect(screen.getByTestId('skeleton-text-area')).toBeInTheDocument()
  })

  test('should show error message when there is an error', () => {
    ;(useController as jest.Mock).mockReturnValueOnce({
      field: { value: '', onChange: jest.fn(), onBlur: jest.fn() },
      fieldState: { error: { message: 'Error message' } },
    })
    renderWithFormProvider(<TextFieldArea {...defaultProps} />)
    expect(screen.getByText('Error message')).toBeInTheDocument()
  })
})
