import { render, screen } from '@testing-library/react'
import { Submission } from '.'
import AppProviders from '../../components/AppProviders'
import { useBreadcrumbsHook } from './hooks/useBreadcrumbsHook'
import { useFileHandlingHook } from './hooks/useFileHandlingHook'
import { useDialogHook } from './hooks/useDialogHook'
import { useLogoutHook } from './hooks/useLogoutHook'
import { useSubmissionTestHook } from './hooks/useSubmissionTestHook'
import { useUserContext } from '../../contexts/UserContext'
import { listExamsRepository } from './repositories/listExamsRepository'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import useNavigation from '../../hooks/useNavigation'

jest.mock('lottie-web', () => ({
  loadAnimation: () => ({
    destroy: jest.fn(),
  }),
}))

jest.mock('../../hooks/useNavigation')
jest.mock('./hooks/useBreadcrumbsHook')
jest.mock('./hooks/useFileHandlingHook')
jest.mock('./hooks/useDialogHook')
jest.mock('./hooks/useLogoutHook')
jest.mock('./hooks/useSubmissionTestHook')
jest.mock('../../contexts/UserContext')
jest.mock('./repositories/listExamsRepository')
jest.mock('./hooks/useDialogItemToRender')
jest.mock('../../hooks/useNavigation')

const mockUseBreadcrumbsHook = useBreadcrumbsHook as jest.Mock
const mockUseFileHandlingHook = useFileHandlingHook as jest.Mock
const mockUseDialogHook = useDialogHook as jest.Mock
const mockUseLogoutHook = useLogoutHook as jest.Mock
const mockUseSubmissionTestHook = useSubmissionTestHook as jest.Mock
const mockUseUserContext = useUserContext as jest.Mock
const mockListExamsRepository = listExamsRepository as jest.Mock
const mockUseDialogItemToRender = useDialogItemToRender as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock

describe('Submission', () => {
  beforeEach(() => {
    mockUseBreadcrumbsHook.mockReturnValue([])
    mockUseFileHandlingHook.mockReturnValue({
      getInputProps: jest.fn(),
      getRootProps: jest.fn(),
      loadingFiles: false,
      filesUploaded: [],
      queryHook: {},
      hasFiles: false,
      hasNoFiles: true,
      formattedFiles: [],
      selectedOptionEnabledFormatted: {},
    })
    mockUseDialogHook.mockReturnValue({
      handleOpenDialog: jest.fn(),
      handleCloseDialog: jest.fn(),
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: false,
      setDialogSubmissionStep: jest.fn(),
      dialogSubmissionStep: 0,
    })
    mockUseLogoutHook.mockReturnValue({
      handleOpenLogoutDialog: jest.fn(),
      logoutConfig: {},
    })
    mockUseSubmissionTestHook.mockReturnValue({
      handleSubmissionTest: jest.fn(),
      isLoadingSubmissionTest: false,
    })
    mockUseUserContext.mockReturnValue({
      isUserExists: true,
    })
    mockListExamsRepository.mockReturnValue({
      isListExamsLoading: false,
    })
    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender: null,
    })
    mockUseNavigation.mockReturnValue(jest.fn())
  })

  const renderComponent = () => {
    render(
      <AppProviders>
        <Submission />
      </AppProviders>,
    )
  }

  it('renders the component correctly', () => {
    renderComponent()

    expect(screen.getByTestId('page-title')).toBeInTheDocument()
    expect(screen.getByTestId('page-description')).toBeInTheDocument()
    expect(screen.getByTestId('file-uploader')).toBeInTheDocument()
  })

  it('renders the skeleton when exams are loading', () => {
    mockListExamsRepository.mockReturnValue({
      isListExamsLoading: true,
    })

    renderComponent()

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('renders the file uploader with correct props', () => {
    renderComponent()

    const fileUploader = screen.getByTestId('file-uploader')
    expect(fileUploader).toHaveAttribute('variant', 'valid')
  })
  it('renders SkeletonBreadcrumbs when user does not exist', () => {
    mockUseUserContext.mockReturnValue({
      isUserExists: false,
    })

    renderComponent()

    expect(screen.getByTestId('skeleton-breadcrumbs')).toBeInTheDocument()
  })

  it('renders Breadcrumb when user exists and requests are not loading', () => {
    mockUseUserContext.mockReturnValue({
      isUserExists: true,
    })
    mockUseSubmissionTestHook.mockReturnValue({
      ...mockUseSubmissionTestHook(),
      isLoadingSubmissionTest: false,
    })

    renderComponent()

    expect(screen.getByTestId('breadcrumb')).toBeInTheDocument()
  })
})
