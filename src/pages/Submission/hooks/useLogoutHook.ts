import { useLogout } from '../../../hooks/useLogout'
import { DialogStep } from '../interfaces'

export function useLogoutHook(
  setDialogSubmissionStep: (value: DialogStep) => void,
  handleUpdateDialogControlled: (open: boolean) => void,
) {
  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
    handleStep: (value: DialogStep) => setDialogSubmissionStep(value),
  })

  return {
    handleOpenLogoutDialog,
    logoutConfig,
  }
}
