import { render, screen, fireEvent } from '@testing-library/react'
import { Step2 } from '.'
import { useForm, FormProvider, FieldErrors } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { SignupFormData } from '../../schema'
import AppProviders from '../../../../components/AppProviders'

const handleGenerateFile = jest.fn()

jest.mock('./hooks/useFileGenerator', () => ({
  useFileGenerator: () => ({
    handleGenerateFile,
  }),
}))

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  )
}

describe('Step2 Component', () => {
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
        <Step2 control={control} errors={errors} setStep={setStep} />
      </FormProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders step 2 component', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('signup-instruction')).toHaveTextContent(
      'Por favor, preencha sua senha para acessar a plataforma e aproveitar todos os recursos disponíveis.',
    )
  })

  test('renders input fields correctly', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('input-password')).toBeInTheDocument()
    expect(screen.getByTestId('input-confirmPassword')).toBeInTheDocument()
  })

  test('displays error message when terms of privacy are not accepted', () => {
    const errors: FieldErrors<SignupFormData> = {
      termsOfPrivacy: {
        type: 'required',
        message: 'Você deve aceitar os termos de privacidade',
      },
    }
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('error-termsOfPrivacy')).toHaveTextContent(
      'Você deve aceitar os termos de privacidade',
    )
  })

  test('displays error message when terms of use are not accepted', () => {
    const errors: FieldErrors<SignupFormData> = {
      termsOfUse: {
        type: 'required',
        message: 'Você deve aceitar os termos de uso',
      },
    }
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    expect(screen.getByTestId('error-termsOfUse')).toHaveTextContent(
      'Você deve aceitar os termos de uso',
    )
  })

  test('calls setStep with correct value when back button is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    fireEvent.click(screen.getByTestId('button-back'))
    expect(setStep).toHaveBeenCalledWith(1)
  })

  test('calls setStep with correct value when next button is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    fireEvent.click(screen.getByTestId('button-next'))
    expect(setStep).toHaveBeenCalledWith(3)
  })

  test('generates privacy terms file when privacy link is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    fireEvent.click(screen.getByTestId('link-privacy'))
    expect(handleGenerateFile).toHaveBeenCalledWith(
      'privacy',
      'Erro ao gerar os termos de privacidade, tente novamente mais tarde.',
    )
  })

  test('generates terms of use file when terms link is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    renderWithProviders(<TestComponent errors={errors} setStep={setStep} />)
    fireEvent.click(screen.getByTestId('link-terms'))
    expect(handleGenerateFile).toHaveBeenCalledWith(
      'terms',
      'Erro ao gerar os termos, tente novamente mais tarde.',
    )
  })
})
