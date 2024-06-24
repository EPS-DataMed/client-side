import React from 'react'
import { render, screen } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { MemoryRouter } from 'react-router-dom'
import PersonalInfo from '../PersonalInfo'
import { PERSONAL_INFO_FIELDS } from '../../constants'
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

describe('PersonalInfo Component', () => {
  const TestComponent = () => {
    const methods = useForm()
    const { control } = methods

    return (
      <FormProvider {...methods}>
        <PersonalInfo control={control} />
      </FormProvider>
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useUserContext as jest.Mock).mockReturnValue({ isUserExists: true })
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields: { personalInfo: [] },
      hasFormData: true,
    })
  })

  test('renders section title', () => {
    renderWithProviders(<TestComponent />)
    expect(
      screen.getByText('Seção 01: Informações Pessoais'),
    ).toBeInTheDocument()
  })

  test('renders all input fields', () => {
    renderWithProviders(<TestComponent />)
    PERSONAL_INFO_FIELDS.forEach((field) => {
      expect(screen.getByTestId(`input-${field.name}`)).toBeInTheDocument()
    })
  })

  test('sets default value based on formUserFields', () => {
    const formUserFields = {
      personalInfo: [
        { name: 'weight', value: '82' },
        { name: 'height', value: '180' },
      ],
    }
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      formUserFields,
      hasFormData: true,
    })

    renderWithProviders(<TestComponent />)

    expect(screen.getByDisplayValue('82')).toBeInTheDocument()
    expect(screen.getByDisplayValue('180')).toBeInTheDocument()
  })
})
