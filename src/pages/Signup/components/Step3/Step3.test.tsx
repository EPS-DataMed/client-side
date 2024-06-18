import { render, screen, fireEvent } from '@testing-library/react'
import { Step3 } from '.'
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

describe('Step3 Component', () => {
  const TestComponent = ({
    errors,
    setStep,
    loading,
    handleNextStep,
    isMedicalInfoFilled,
  }: {
    errors: FieldErrors<SignupFormData>
    setStep: jest.Mock
    loading: boolean
    handleNextStep: jest.Mock
    isMedicalInfoFilled: boolean
  }) => {
    const methods = useForm<SignupFormData>()
    const { control } = methods

    return (
      <FormProvider {...methods}>
        <Step3
          control={control}
          errors={errors}
          setStep={setStep}
          loading={loading}
          handleNextStep={handleNextStep}
          isMedicalInfoFilled={isMedicalInfoFilled}
        />
      </FormProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders step 3 component', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    expect(screen.getByTestId('signup-instruction')).toHaveTextContent(
      'Se você for médico, preencha as informações abaixo, se não apenas continue o cadastro.',
    )
  })

  test('renders input fields correctly', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    expect(screen.getByTestId('input-crm')).toBeInTheDocument()
    expect(screen.getByTestId('select-specialty')).toBeInTheDocument()
  })

  test('displays error message when specialty is not selected', () => {
    const errors: FieldErrors<SignupFormData> = {
      specialty: {
        type: 'required',
        message: 'Selecione a especialidade',
      },
    }
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    expect(screen.getByTestId('error-specialty')).toHaveTextContent(
      'Selecione a especialidade',
    )
  })

  test('calls setStep with correct value when back button is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    fireEvent.click(screen.getByTestId('button-back'))
    expect(setStep).toHaveBeenCalledWith(2)
  })

  test('calls handleNextStep when submit button is clicked', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    fireEvent.click(screen.getByTestId('button-submit'))
    expect(handleNextStep).toHaveBeenCalled()
  })

  test('displays spinner when loading', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    const isMedicalInfoFilled = false
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={true}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={isMedicalInfoFilled}
      />,
    )
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('displays correct button text when isMedicalInfoFilled is true', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={true}
      />,
    )
    expect(screen.getByTestId('button-submit')).toHaveTextContent('Cadastrar')
  })

  test('displays correct button text when isMedicalInfoFilled is false', () => {
    const errors: FieldErrors<SignupFormData> = {}
    const setStep = jest.fn()
    const handleNextStep = jest.fn()
    renderWithProviders(
      <TestComponent
        errors={errors}
        setStep={setStep}
        loading={false}
        handleNextStep={handleNextStep}
        isMedicalInfoFilled={false}
      />,
    )
    expect(screen.getByTestId('button-submit')).toHaveTextContent(
      'Pular e Cadastrar',
    )
  })
})
