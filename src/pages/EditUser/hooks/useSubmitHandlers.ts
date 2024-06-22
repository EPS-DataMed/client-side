import { useState, useCallback } from 'react'
import { EditFormData } from '../schema'
import { getUserId } from '../../../utils/getUserId'
import { deleteAccount, editPassword } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'
import useNavigation from '../../../hooks/useNavigation'

export function useSubmitHandlers() {
  const [loadingPasswordData, setLoadingPasswordData] = useState(false)
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false)

  const navigateTo = useNavigation()

  const handleSubmitChangePassword = useCallback(
    async (passwordData: EditFormData) => {
      const { userId } = getUserId()
      setLoadingPasswordData(true)
      try {
        await editPassword(userId, passwordData)
        SuccessToast('Senha atualizada com sucesso!')
      } catch (error) {
        ErrorToast(
          'Verifique suas informações novamente! Ou tente novamente mais tarde.',
        )
      } finally {
        setLoadingPasswordData(false)
      }
    },
    [],
  )

  const handleSubmitDeleteAccount = useCallback(async () => {
    setLoadingDeleteAccount(true)
    try {
      const { userId } = getUserId()
      const userResponse = await deleteAccount(userId)
      if (userResponse) {
        SuccessToast('Conta apagada com sucesso!')
        navigateTo('/', { replace: true })
      } else {
        throw new Error()
      }
    } catch (error) {
      ErrorToast('Erro ao apagar conta. Tente novamente mais tarde.')
    } finally {
      setLoadingDeleteAccount(false)
    }
  }, [navigateTo])

  return {
    loadingPasswordData,
    loadingDeleteAccount,
    handleSubmitChangePassword,
    handleSubmitDeleteAccount,
  }
}
