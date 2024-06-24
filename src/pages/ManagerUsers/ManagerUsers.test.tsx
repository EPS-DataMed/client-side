import { render, screen, fireEvent } from '@testing-library/react'
import { ManagerUsers } from '.'
import { useUserContext } from '../../contexts/UserContext'
import { listDependentsRepository } from './repositories/listDependentsRepository'
import { useDialogControlled } from '../../components/DialogControlled'
import { useLogout } from '../../hooks/useLogout'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import useNavigation from '../../hooks/useNavigation'
import AppProviders from '../../components/AppProviders'
import { getUserId } from '../../utils/getUserId'
import { getCookie } from '../../utils/cookies'
import { deleteUserDependent } from './services'

jest.mock('lottie-web', () => ({
  loadAnimation: () => ({
    destroy: jest.fn(),
  }),
}))

jest.mock('../../contexts/UserContext')
jest.mock('./repositories/listDependentsRepository')
jest.mock('../../components/DialogControlled')
jest.mock('../../hooks/useLogout')
jest.mock('./hooks/useDialogItemToRender')
jest.mock('./hooks/useBreadcrumbs')
jest.mock('../../hooks/useNavigation')
jest.mock('../../utils/getUserId')
jest.mock('../../utils/cookies')
jest.mock('./services')
jest.mock('../../components/Toast')

const mockUseUserContext = useUserContext as jest.Mock
const mockListDependentsRepository = listDependentsRepository as jest.Mock
const mockUseDialogControlled = useDialogControlled as jest.Mock
const mockUseLogout = useLogout as jest.Mock
const mockUseDialogItemToRender = useDialogItemToRender as jest.Mock
const mockUseBreadcrumbs = useBreadcrumbs as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock
const mockGetUserId = getUserId as jest.Mock
const mockGetCookie = getCookie as jest.Mock
const mockDeleteUserDependent = deleteUserDependent as jest.Mock

describe('ManagerUsers Component', () => {
  beforeEach(() => {
    mockUseUserContext.mockReturnValue({ isUserExists: true, isDoctor: false })
    mockListDependentsRepository.mockReturnValue({
      dependents: [],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: false,
    })
    mockUseLogout.mockReturnValue({
      handleOpenLogoutDialog: jest.fn(),
      logoutConfig: {},
    })
    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender: null,
      setDialogManagerUsersStep: jest.fn(),
      setDependentToDelete: jest.fn(),
    })
    mockUseBreadcrumbs.mockReturnValue([])
    mockUseNavigation.mockReturnValue(jest.fn())
    mockGetUserId.mockReturnValue({ userId: 1 })
    mockGetCookie.mockReturnValue('token')
    mockDeleteUserDependent.mockResolvedValue({})
  })

  const renderComponent = (isDoctor = false) => {
    mockUseUserContext.mockReturnValue({ isUserExists: true, isDoctor })
    return render(
      <AppProviders>
        <ManagerUsers />
      </AppProviders>,
    )
  }

  it('should render without crashing', () => {
    renderComponent()
    expect(screen.getByTestId('not-found-text')).toBeInTheDocument()
  })

  it('should display skeleton loaders when loading', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [],
      isListDependentsLoading: true,
      setDependents: jest.fn(),
    })
    renderComponent()
    expect(screen.getByTestId('skeleton-button')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-breadcrumbs')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-title')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-description')).toBeInTheDocument()
    expect(screen.getByTestId('table-skeleton')).toBeInTheDocument()
  })

  it('should display empty state when no dependents', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent()
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('should open add dependent dialog', () => {
    const handleUpdateDialogControlled = jest.fn()
    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled,
      isDialogControlledOpen: false,
    })
    renderComponent()
    fireEvent.click(screen.getByTestId('add-dependent-button'))
    expect(handleUpdateDialogControlled).toHaveBeenCalledWith(true)
  })

  it('should handle navigation on exame action', () => {
    const navigateTo = jest.fn()
    mockUseNavigation.mockReturnValue(navigateTo)
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent()
    fireEvent.click(screen.getByTestId('action-button-exames-1'))
    expect(navigateTo).toHaveBeenCalledWith('/submission/manager/1')
  })

  it('should render "Dependente" when isDoctor is false', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(false)
    expect(screen.getByText('Dependente')).toBeInTheDocument()
  })

  it('should render "Paciente" when isDoctor is true', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(true)
    expect(screen.getByText('Paciente')).toBeInTheDocument()
  })

  it('should render title "Dependentes" when isDoctor is false', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(false)
    expect(screen.getByTestId('page-title').textContent).toBe('Dependentes')
  })

  it('should render title "Pacientes" when isDoctor is true', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(true)
    expect(screen.getByTestId('page-title').textContent).toBe('Pacientes')
  })

  it('should render description with "dependentes" when isDoctor is false', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(false)
    expect(screen.getByTestId('page-description').textContent).toContain(
      'dependentes',
    )
  })

  it('should render description with "pacientes" when isDoctor is true', () => {
    mockListDependentsRepository.mockReturnValue({
      dependents: [
        {
          dependent_id: 1,
          user_full_name: 'John Doe',
          user_birth_date: '2000-01-01',
          form_status: 'Filled',
        },
      ],
      isListDependentsLoading: false,
      setDependents: jest.fn(),
    })
    renderComponent(true)
    expect(screen.getByTestId('page-description').textContent).toContain(
      'pacientes',
    )
  })

  it('should handle delete dependent correctly', () => {
    const handleUpdateDialogControlled = jest.fn()
    const setDependentToDelete = jest.fn()

    const dependents = [
      {
        dependent_id: 1,
        user_full_name: 'John Doe',
        user_birth_date: '2000-01-01',
        form_status: 'Filled',
      },
    ]

    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled,
      isDialogControlledOpen: false,
    })

    mockListDependentsRepository.mockReturnValue({
      dependents,
      isListDependentsLoading: false,
      setDependents: jest.fn(),
      deleteDependentDialog: jest.fn(),
      dependentToDelete: null,
      setDependentToDelete,
      isDeleting: false,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('action-button-excluir-1'))

    expect(handleUpdateDialogControlled).toHaveBeenCalledWith(true)
    expect(setDependentToDelete).toHaveBeenCalledWith(dependents[0])
    expect(screen.getByText('Dependente')).toBeInTheDocument()
  })
  it('should render DialogControlled when isDialogControlledOpen is true and dialogItemToRender is defined', async () => {
    const handleUpdateDialogControlled = jest.fn()
    const deleteDependentDialog = jest.fn()
    const dialogItemToRender = {
      title: 'Excluir dependente',
      description:
        'Tem certeza de que deseja excluir o dependente John Doe? Esta ação é irreversível e não será possível desfazê-la.',
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: handleUpdateDialogControlled,
        },
        {
          id: 'delete',
          label: 'Excluir',
          variant: 'primary',
          action: deleteDependentDialog,
          backgroundColor: '#f00',
          color: '#fff',
        },
      ],
    }

    const setDependentToDelete = jest.fn()

    const dependents = [
      {
        dependent_id: 1,
        user_full_name: 'John Doe',
        user_birth_date: '2000-01-01',
        form_status: 'Filled',
      },
    ]

    mockListDependentsRepository.mockReturnValue({
      dependents,
      isListDependentsLoading: false,
      setDependents: jest.fn(),
      deleteDependentDialog: jest.fn(),
      dependentToDelete: null,
      setDependentToDelete,
      isDeleting: false,
    })

    mockUseDialogControlled.mockReturnValue({
      handleUpdateDialogControlled,
      isDialogControlledOpen: true,
    })

    mockUseDialogItemToRender.mockReturnValue({
      dialogItemToRender,
      setDialogManagerUsersStep: jest.fn(),
      setDependentToDelete: jest.fn(),
    })

    renderComponent()
  })
})
