import { render, screen, fireEvent } from '@testing-library/react'
import { Step1 } from '.'
import { useForm, FormProvider, FieldErrors } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { SignupFormData } from '../../schema'
import AppProviders from '../../../../components/AppProviders'

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  )
}

describe('Step1 Component', () => {
  const TestComponent = ({
    errors,
    setStep,
  }: {
    errors: FieldErrors<SignupFormData>
    setStep: jest.Mock
  }) => {
    const methods = useForm<SignupFormData>()
    const { control } = methods

    return (
      <FormProvider {...methods}>
        <Step1 control={control} errors={errors} setStep={setStep} />
      </FormProvider>
    )
  }

  test('renders step 1 component', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('signup-instruction')).toHaveTextContent(
      'Preencha suas informações básicas e avance para a próxima etapa.',
    )
  })

  test('renders input fields correctly', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('input-name')).toBeInTheDocument()
    expect(screen.getByTestId('input-email')).toBeInTheDocument()
    expect(screen.getByTestId('input-dateOfBirth')).toBeInTheDocument()
  })

  test('displays error message when sex is not selected', () => {
    const errors: FieldErrors<SignupFormData> = {
      sex: {
        type: 'required',
        message: 'Selecione o sexo',
      },
    }
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('error-sex')).toHaveTextContent(
      'Selecione o sexo',
    )
  })

  test('calls setStep with correct value when next button is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    fireEvent.click(screen.getByTestId('button-next'))
    expect(setStep).toHaveBeenCalledWith(2)
  })
})
