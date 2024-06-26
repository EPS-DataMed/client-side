import { useState, useCallback } from 'react'
import { DeleteAccData, EditFormData } from '../schema'
import { getUserId } from '../../../utils/getUserId'
import { deleteAccount, editPassword } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'
import useNavigation from '../../../hooks/useNavigation'
import { useDialogControlled } from '../../../components/DialogControlled'
import { DialogStep } from '../interfaces/dialogStep'
import { useLogout } from '../../../hooks/useLogout'

export function useSubmitHandlers() {
  const [loadingPasswordData, setLoadingPasswordData] = useState(false)
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false)
  const [passwordData, setPasswordData] = useState({} as EditFormData)
  const [deletePasswordData, setDeletePasswordData] = useState(
    {} as DeleteAccData,
  )

  const navigateTo = useNavigation()

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  const handleOpenPasswordDialog = useCallback(
    (data: EditFormData) => {
      handleUpdateDialogControlled(true)
      setDialogSubmissionStep('change_password')
      setPasswordData(data)
    },
    [handleUpdateDialogControlled],
  )

  const handleOpenDeleteAccountDialog = (data: DeleteAccData) => {
    handleUpdateDialogControlled(true)
    setDialogSubmissionStep('delete_account')
    setDeletePasswordData(data)
  }

  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
    handleStep: (value: DialogStep) => setDialogSubmissionStep(value),
  })

  const handleSubmitChangePassword = useCallback(
    async (passwordData: EditFormData) => {
      const { userId } = getUserId()
      setLoadingPasswordData(true)
      try {
        const payload = {
          old_password: passwordData.password,
          new_password: passwordData.newPassword,
        }
        await editPassword(userId, payload)
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

  const handleSubmitDeleteAccount = useCallback(
    async (passwordData: DeleteAccData) => {
      setLoadingDeleteAccount(true)
      try {
        const payload = {
          password: passwordData.currentPassword,
        }
        const { userId } = getUserId()
        const isValid = await deleteAccount(userId, false, payload)

        if (isValid) {
          const deleteResponse = await deleteAccount(userId, true, payload)

          if (deleteResponse) {
            SuccessToast('Conta apagada com sucesso!')
            navigateTo('/', { replace: true })
          }
        }
      } catch (error) {
        ErrorToast('Erro ao apagar conta. Tente novamente mais tarde.')
      } finally {
        setLoadingDeleteAccount(false)
      }
    },
    [navigateTo],
  )

  return {
    loadingPasswordData,
    loadingDeleteAccount,
    handleSubmitChangePassword,
    handleSubmitDeleteAccount,
    handleOpenLogoutDialog,
    handleOpenDeleteAccountDialog,
    logoutConfig,
    handleOpenPasswordDialog,
    passwordData,
    deletePasswordData,
    isDialogControlledOpen,
    dialogSubmissionStep,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
  }
}
