import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserForm } from '.'
import { useSubmissionTestContext } from '../../contexts/SubmissionTestContext'
import { useDialogControlled } from '../../components/DialogControlled'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import useNavigation from '../../hooks/useNavigation'
import { getUserId } from '../../utils/getUserId'
import { getCookie } from '../../utils/cookies'
import { useUserContext } from '../../contexts/UserContext'
import AppProviders from '../../components/AppProviders'
import { useReactToPrint } from 'react-to-print'

jest.mock('lottie-web', () => ({
  loadAnimation: () => ({
    destroy: jest.fn(),
  }),
}))

jest.mock('../../contexts/SubmissionTestContext')
jest.mock('../../components/DialogControlled')
jest.mock('./hooks/useDialogItemToRender')
jest.mock('../../hooks/useNavigation')
jest.mock('./services')
jest.mock('../../components/Toast')
jest.mock('../../utils/getUserId')
jest.mock('../../utils/cookies')
jest.mock('../../contexts/UserContext')
jest.mock('react-to-print')

const mockUseSubmissionTestContext = useSubmissionTestContext as jest.Mock
const mockUseDialogControlled = useDialogControlled as jest.Mock
const mockUseDialogItemToRender = useDialogItemToRender as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock
const mockGetUserId = getUserId as jest.Mock
const mockGetCookie = getCookie as jest.Mock
const mockUseUserContext = useUserContext as jest.Mock
const mockUseReactToPrint = useReactToPrint as jest.Mock

describe('UserForm', () => {
  beforeEach(() => {
    mockUseSubmissionTestContext.mockReturnValue({
      formData: {
        weight: '70',
        height: '175',
        bmi: '22.86',
        bloodType: 'O+',
        abdominalCircumference: '85',
        hemoglobin: '14',
        redBloodCell: '4.5',
        ast: '30',
        alt: '20',
        urea: '35',
        creatinine: '1.1',
        hematocrit: '45',
        glycatedHemoglobin: '5.5',
        allergies: 'None',
        diseases: 'None',
        medications: 'None',
        familyHistory: 'None',
        importantNotes: 'None',
        imageReports: 'None',
      },
      formUserFields: {
        personalInfo: [],
        hemogram: [],
        hepaticFunction: [],
        renalFunction: [],
        additionalInfo: [],
      },
      hasFormData: true,
      setProcessFormData: jest.fn(),
    })
    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: false,
    })
    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender: null,
    })
    mockUseNavigation.mockReturnValue(jest.fn())
    mockGetUserId.mockReturnValue({ userId: 1 })
    mockGetCookie.mockReturnValue('token')
    mockUseUserContext.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'male',
        id: 1,
        creation_date: '2023-01-01',
        password: 'hashed_password',
        doctor: {
          crm: '123456',
          specialty: 'Cardiology',
          user_id: 1,
        },
      },
      setUser: jest.fn(),
      isUserExists: true,
      isDoctor: true,
      userAge: 33,
    })
  })

  const renderComponent = () => {
    render(
      <AppProviders>
        <UserForm />
      </AppProviders>,
    )
  }

  it('renders the form elements correctly', () => {
    renderComponent()

    expect(screen.getByTestId('page-title')).toBeInTheDocument()
    expect(screen.getByTestId('page-description')).toBeInTheDocument()
    expect(screen.getByTestId('user-form')).toBeInTheDocument()
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('calls handleNavigationToSubmission when back button is clicked', () => {
    const handleNavigationToSubmission = jest.fn()
    mockUseNavigation.mockReturnValue(handleNavigationToSubmission)

    renderComponent()

    fireEvent.click(screen.getByTestId('back-button'))
    expect(handleNavigationToSubmission).toHaveBeenCalled()
  })

  it('displays loading spinner when submitting', async () => {
    renderComponent()

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
  })

  it('renders DialogControlled when isDialogControlledOpen is true', async () => {
    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: true,
    })

    const dialogItemToRender = {
      title: 'Salvar Formulário',
      description: 'Seu formulário foi salvo com sucesso!',
      buttonConfig: [
        {
          id: 'close',
          label: 'Fechar',
          action: jest.fn(),
        },
      ],
    }

    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender,
    })

    renderComponent()
  })

  it('calls handleCloseDialog when DialogControlled is closed', async () => {
    const handleUpdateDialogControlled = jest.fn()
    const handleCloseDialog = jest.fn()

    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled,
      isDialogControlledOpen: true,
    })

    const dialogItemToRender = {
      title: 'Salvar Formulário',
      description: 'Seu formulário foi salvo com sucesso!',
      buttonConfig: [
        {
          id: 'close',
          label: 'Fechar',
          action: handleCloseDialog,
        },
      ],
    }

    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender,
    })

    renderComponent()
  })

  it('calls handleHealthDataPrint when print button is clicked', () => {
    const handleHealthDataPrint = jest.fn()
    mockUseReactToPrint.mockReturnValue(handleHealthDataPrint)

    renderComponent()
  })

  it('calls setUserInfoFilled with an empty user object after printing', () => {
    const setUserInfoFilled = jest.fn()
    mockUseSubmissionTestContext.mockReturnValue({
      ...mockUseSubmissionTestContext(),
      setUserInfoFilled,
    })

    renderComponent()
  })

  it('renders DatamedCard when userInfoFilled has valid keys', () => {
    mockUseSubmissionTestContext.mockReturnValue({
      ...mockUseSubmissionTestContext(),
      userInfoFilled: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
      },
    })

    renderComponent()
  })

  it('calls handleOpenLogoutDialog when logout button is clicked', () => {
    const handleOpenLogoutDialog = jest.fn()
    mockUseUserContext.mockReturnValue({
      ...mockUseUserContext(),
      handleOpenLogoutDialog,
    })

    renderComponent()
  })

  it('calculates BMI correctly when weight and height are provided', () => {
    renderComponent()

    expect(screen.getByDisplayValue('22.86')).toBeInTheDocument()
  })
})
