import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import HealthData from '../HealthData'
import {
  HEMOGRAM_FIELDS,
  HEPATIC_FUNCTION_FIELDS,
  RENAL_FUNCTION_FIELDS,
} from '../../constants'
import { useUserContext } from '../../../../contexts/UserContext'
import { useSubmissionTestContext } from '../../../../contexts/SubmissionTestContext'
import AppProviders from '../../../../components/AppProviders'

jest.mock('../../../../contexts/UserContext')
jest.mock('../../../../contexts/SubmissionTestContext')

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  )
}

describe('HealthData Component', () => {
  const TestComponent = () => {
    const methods = useForm()
    const { control } = methods

    return (
      <FormProvider {...methods}>
        <HealthData control={control} />
      </FormProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUserContext as jest.Mock).mockReturnValue({ isUserExists: true })
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields: {
        hemogram: [],
        hepaticFunction: [],
        renalFunction: [],
      },
      hasFormData: true,
    })
  })

  test('renders section title', () => {
    renderWithProviders(<TestComponent />)
    expect(screen.getByText('Seção 02: Dados de saúde')).toBeInTheDocument()
  })

  test('renders all hemogram fields', () => {
    renderWithProviders(<TestComponent />)
    HEMOGRAM_FIELDS.forEach((field) => {
      expect(screen.getByTestId(`input-${field.name}`)).toBeInTheDocument()
    })
  })

  test('renders all hepatic function fields', () => {
    renderWithProviders(<TestComponent />)
    HEPATIC_FUNCTION_FIELDS.forEach((field) => {
      expect(screen.getByTestId(`input-${field.name}`)).toBeInTheDocument()
    })
  })

  test('renders all renal function fields', () => {
    renderWithProviders(<TestComponent />)
    RENAL_FUNCTION_FIELDS.forEach((field) => {
      expect(screen.getByTestId(`input-${field.name}`)).toBeInTheDocument()
    })
  })

  test('sets default value based on formUserFields', () => {
    const formUserFields = {
      hemogram: [
        { name: 'redBloodCell', value: '4.5' },
        { name: 'hemoglobin', value: '14.0' },
      ],
      hepaticFunction: [
        { name: 'ast', value: '30' },
        { name: 'alt', value: '40' },
      ],
      renalFunction: [
        { name: 'urea', value: '20' },
        { name: 'creatinine', value: '1.0' },
      ],
    }
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields,
      hasFormData: true,
    })

    renderWithProviders(<TestComponent />)

    expect(screen.getByDisplayValue('4.5')).toBeInTheDocument()
    expect(screen.getByDisplayValue('14.0')).toBeInTheDocument()
    expect(screen.getByDisplayValue('30')).toBeInTheDocument()
    expect(screen.getByDisplayValue('40')).toBeInTheDocument()
    expect(screen.getByDisplayValue('20')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1.0')).toBeInTheDocument()
  })
})
