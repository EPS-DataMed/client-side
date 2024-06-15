import { useCallback } from 'react'
import { removeAccessToken } from '../utils/cookies'
import useNavigation from './useNavigation'
import { DialogConfig } from '../components/DialogControlled/interfaces'
import { defaultTheme } from '../styles/themes/default'

interface LogoutProps {
  handleStep?: (value: any) => void
  handleOpenDialog: (value: boolean) => void
}

export function useLogout({ handleStep, handleOpenDialog }: LogoutProps) {
  const navigateTo = useNavigation()

  const handleLogout = useCallback(() => {
    removeAccessToken()
    navigateTo('/')
  }, [navigateTo])

  const handleOpenLogoutDialog = useCallback(() => {
    handleOpenDialog(true)
    if (handleStep) {
      handleStep('logout')
    }
  }, [handleOpenDialog, handleStep])

  const dialogConfig: DialogConfig = {
    logout: {
      title: 'Confirmar saída',
      description: 'Tem certeza de que deseja encerrar a sessão na plataforma?',
      width: '20rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: () => {
            handleOpenDialog(false)
            if (handleStep) {
              handleStep('')
            }
          },
        },
        {
          id: 'delete',
          label: 'Sair',
          variant: 'primary',
          action: () => {
            handleLogout()
            handleOpenDialog(false)
            if (handleStep) {
              handleStep('')
            }
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    },
  }

  return {
    handleLogout,
    handleOpenLogoutDialog,
    logoutConfig: dialogConfig.logout,
  }
}
