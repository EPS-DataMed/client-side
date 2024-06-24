import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import AdditionalInfo from '../AdditionalInfo'
import { ADDITIONAL_INFO_FIELDS } from '../../constants'
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

describe('AdditionalInfo Component', () => {
  const TestComponent = () => {
    const methods = useForm()
    const { control } = methods

    return (
      <FormProvider {...methods}>
        <AdditionalInfo control={control} />
      </FormProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUserContext as jest.Mock).mockReturnValue({ isUserExists: true })
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields: {
        additionalInfo: [],
      },
      hasFormData: true,
    })
  })

  test('renders section title', () => {
    renderWithProviders(<TestComponent />)
    expect(
      screen.getByText('Seção 03: Informações adicionais'),
    ).toBeInTheDocument()
  })

  test('renders all additional info fields', () => {
    renderWithProviders(<TestComponent />)
    ADDITIONAL_INFO_FIELDS.forEach((field) => {
      expect(screen.getByTestId(`text-field-${field.name}`)).toBeInTheDocument()
    })
  })

  test('sets default value based on formUserFields', () => {
    const formUserFields = {
      additionalInfo: [
        { name: 'allergies', value: 'Pollen' },
        { name: 'diseases', value: 'Diabetes' },
      ],
    }
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields,
      hasFormData: true,
    })

    renderWithProviders(<TestComponent />)

    expect(screen.getByDisplayValue('Pollen')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Diabetes')).toBeInTheDocument()
  })
})
