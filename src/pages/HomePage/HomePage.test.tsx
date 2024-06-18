/* eslint-disable prettier/prettier */

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { HomePage } from '.'
import useNavigation from '../../hooks/useNavigation'
import { useWelcomeMessage } from './hooks/useWelcomeMessage'
import { useUserContext } from '../../contexts/UserContext'
import { useLogout } from '../../hooks/useLogout'
import { useDialogControlled } from '../../components/DialogControlled'
import AppProviders from '../../components/AppProviders'

jest.mock('../../hooks/useNavigation')
jest.mock('./hooks/useWelcomeMessage')
jest.mock('../../contexts/UserContext')
jest.mock('../../hooks/useLogout')
jest.mock('../../components/DialogControlled')

describe('HomePage', () => {
  const navigateTo = jest.fn()
  const handleUpdateDialogControlled = jest.fn()
  const handleOpenLogoutDialog = jest.fn()
  const handleStep = jest.fn()
  const logoutConfig = {
    title: 'Confirmar saída',
    description: 'Tem certeza de que deseja encerrar a sessão na plataforma?',
    width: '20rem',
    buttonConfig: [
      { id: 'back', label: 'Voltar', variant: 'secondary', action: jest.fn() },
      { id: 'delete', label: 'Sair', variant: 'primary', action: jest.fn() },
    ],
  }

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue(navigateTo)
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: '' })
    ;(useUserContext as jest.Mock).mockReturnValue({ isDoctor: true })
    ;(useLogout as jest.Mock).mockReturnValue({
      handleOpenLogoutDialog,
      logoutConfig,
      handleStep,
    })
    ;(useDialogControlled as jest.Mock).mockReturnValue({
      handleUpdateDialogControlled,
      isDialogControlledOpen: false,
    })
  })

  const renderHomePage = () => {
    return render(
      <AppProviders>
        <HomePage />
      </AppProviders>
    )
  }

  it('should render the homepage correctly with skeletons', () => {
    renderHomePage()
    
    expect(screen.getByTestId('generic-page-root')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    expect(screen.getByTestId('header-options')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    expect(screen.getByTestId('divider-top')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-welcome-text')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-question')).toBeInTheDocument()
    expect(screen.getByTestId('options')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-skeleton-submission')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-skeleton-manager')).toBeInTheDocument()
    expect(screen.getByTestId('divider-bottom')).toBeInTheDocument()
  })

  it('should render the homepage correctly with welcome message when isDoctor is true', () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    ;(useUserContext as jest.Mock).mockReturnValue({ isDoctor: true })
    renderHomePage()
    
    expect(screen.getByTestId('generic-page-root')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    expect(screen.getByTestId('header-options')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    expect(screen.getByTestId('divider-top')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('Bem-vindo, Dr. João!')
    expect(screen.getByTestId('welcome-question')).toBeInTheDocument()
    expect(screen.getByTestId('options')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-submission')).toBeInTheDocument()
    expect(screen.getByTestId('option-title-submission')).toBeInTheDocument()
    expect(screen.getByTestId('option-description-submission')).toBeInTheDocument()
    expect(screen.getByTestId('image-wrapper-submission')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-manager')).toBeInTheDocument()
    expect(screen.getByTestId('option-title-manager')).toHaveTextContent('Gerenciar Pacientes')
    expect(screen.getByTestId('option-description-manager')).toHaveTextContent('Adicione e gerencie os exames do seu paciente.')
    expect(screen.getByTestId('image-wrapper-manager')).toBeInTheDocument()
    expect(screen.getByTestId('divider-bottom')).toBeInTheDocument()
  })

  it('should render the homepage correctly with welcome message when isDoctor is false', () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    ;(useUserContext as jest.Mock).mockReturnValue({ isDoctor: false })
    renderHomePage()
    
    expect(screen.getByTestId('generic-page-root')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('logo-wrapper')).toBeInTheDocument()
    expect(screen.getByTestId('logo-icon')).toBeInTheDocument()
    expect(screen.getByTestId('header-options')).toBeInTheDocument()
    expect(screen.getByTestId('profile-button')).toBeInTheDocument()
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    expect(screen.getByTestId('divider-top')).toBeInTheDocument()
    expect(screen.getByTestId('main-content')).toBeInTheDocument()
    expect(screen.getByTestId('welcome-text')).toHaveTextContent('Bem-vindo, Dr. João!')
    expect(screen.getByTestId('welcome-question')).toBeInTheDocument()
    expect(screen.getByTestId('options')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-submission')).toBeInTheDocument()
    expect(screen.getByTestId('option-title-submission')).toBeInTheDocument()
    expect(screen.getByTestId('option-description-submission')).toBeInTheDocument()
    expect(screen.getByTestId('image-wrapper-submission')).toBeInTheDocument()
    expect(screen.getByTestId('homepage-option-manager')).toBeInTheDocument()
    expect(screen.getByTestId('option-title-manager')).toHaveTextContent('Gerenciar Dependentes')
    expect(screen.getByTestId('option-description-manager')).toHaveTextContent('Adicione e gerencie os exames dos seus dependentes.')
    expect(screen.getByTestId('image-wrapper-manager')).toBeInTheDocument()
    expect(screen.getByTestId('divider-bottom')).toBeInTheDocument()
  })

  it('should navigate to submission page when submission option is clicked', () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    renderHomePage()

    fireEvent.click(screen.getByTestId('homepage-option-submission'))

    expect(navigateTo).toHaveBeenCalledWith('/submission/home')
  })

  it('should navigate to manager users page when manager option is clicked', () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    renderHomePage()

    fireEvent.click(screen.getByTestId('homepage-option-manager'))

    expect(navigateTo).toHaveBeenCalledWith('/manager/users')
  })

  it('should open the logout dialog when logout button is clicked', () => {
    renderHomePage()

    fireEvent.click(screen.getByTestId('logout-button'))

    expect(handleOpenLogoutDialog).toHaveBeenCalled()
  })


  it('should call handleUpdateDialogControlled when handleOpenLogoutDialog is called', () => {
    const mockHandleUpdateDialogControlled = jest.fn()
  
    ;(useDialogControlled as jest.Mock).mockReturnValue({
      handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
      isDialogControlledOpen: false,
    })
  
    
    ;(useLogout as jest.Mock).mockImplementation(({ handleOpenDialog }) => ({
      handleOpenLogoutDialog: () => {
        handleOpenDialog(true)
      },
      logoutConfig,
      handleStep,
    }))
  
    renderHomePage()
  
    fireEvent.click(screen.getByTestId('logout-button'))
  
    expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(true)
  })
  
  

  it('should display skeleton and load image for submission option', async () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    renderHomePage()

    expect(screen.getByTestId('skeleton-image-submission')).toBeInTheDocument()

    fireEvent.load(screen.getByTestId('image-submission'))

    await waitFor(() => {
      expect(screen.getByTestId('image-submission')).toHaveStyle('display: block')
    })
  })

  it('should display skeleton and load image for manager option', async () => {
    ;(useWelcomeMessage as jest.Mock).mockReturnValue({ welcomeMessageText: 'Bem-vindo, Dr. João!' })
    renderHomePage()

    expect(screen.getByTestId('skeleton-image-manager')).toBeInTheDocument()

    fireEvent.load(screen.getByTestId('image-manager'))

    await waitFor(() => {
      expect(screen.getByTestId('image-manager')).toHaveStyle('display: block')
    })
  })
})
