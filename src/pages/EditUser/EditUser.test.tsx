import { render } from '@testing-library/react'
import { EditUser } from '.'
import AppProviders from '../../components/AppProviders'
import useNavigation from '../../hooks/useNavigation'
import { useSubmitHandlers } from './hooks/useSubmitHandlers'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { useBreadcrumbs } from './hooks/useBreadCrumbs'
import { useUserContext } from '../../contexts/UserContext'

jest.mock('../../hooks/useNavigation')
jest.mock('./hooks/useSubmitHandlers')
jest.mock('./hooks/useDialogItemToRender')
jest.mock('./hooks/useBreadCrumbs')
jest.mock('../../contexts/UserContext')

const mockUseNavigation = useNavigation as jest.Mock
const mockUseSubmitHandlers = useSubmitHandlers as jest.Mock
const mockUseDialogItemToRender = useDialogItemToRender as jest.Mock
const mockUseBreadcrumbs = useBreadcrumbs as jest.Mock

describe('EditUser Component', () => {
  const mockHandleSubmitChangePassword = jest.fn()
  const mockHandleSubmitDeleteAccount = jest.fn()
  const mockHandleOpenPasswordDialog = jest.fn()
  const mockHandleOpenDeleteAccountDialog = jest.fn()
  const mockHandleOpenLogoutDialog = jest.fn()
  const mockHandleUpdateDialogControlled = jest.fn()
  const mockSetDialogSubmissionStep = jest.fn()
  const mockNavigateTo = jest.fn()
  const mockUseUserContext = useUserContext as jest.Mock

  beforeEach(() => {
    mockUseNavigation.mockReturnValue(mockNavigateTo)
    mockUseSubmitHandlers.mockReturnValue({
      loadingPasswordData: false,
      loadingDeleteAccount: false,
      handleSubmitChangePassword: mockHandleSubmitChangePassword,
      handleSubmitDeleteAccount: mockHandleSubmitDeleteAccount,
      handleOpenLogoutDialog: mockHandleOpenLogoutDialog,
      handleOpenDeleteAccountDialog: mockHandleOpenDeleteAccountDialog,
      handleOpenPasswordDialog: mockHandleOpenPasswordDialog,
      passwordData: {},
      deletePasswordData: {},
      isDialogControlledOpen: false,
      dialogSubmissionStep: '',
      handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
      setDialogSubmissionStep: mockSetDialogSubmissionStep,
    })
    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender: null,
    })
    mockUseBreadcrumbs.mockReturnValue([])
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders all child components', () => {
    render(
      <AppProviders>
        <EditUser />
      </AppProviders>,
    )
  })
})
