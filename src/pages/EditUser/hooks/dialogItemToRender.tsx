import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { defaultTheme } from '../../../styles/themes/default'
import { DialogStep } from '../interfaces/dialogStep'
import { EditFormData } from '../schema'

interface DialogItemToRenderProps {
  dialogSubmissionStep: DialogStep
  handleUpdateDialogControlled: (open: boolean) => void
  onSubmitChangePassword: () => void
}

export function useDialogItemToRender({
  handleUpdateDialogControlled,
  dialogSubmissionStep,
  onSubmitChangePassword
}: DialogItemToRenderProps) {
  

  const dialogConfig: DialogConfig = {
    change_password: {
      title: 'Mudar senha',
      description: `Deseja mesmo mudar sua senha?`,
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: () => handleUpdateDialogControlled(false),
        },
        {
          id: 'change',
          label: 'Sim',
          variant: 'primary',
          action: () => {
            onSubmitChangePassword()
            //handleUpdateDialogControlled(false)
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    },
    delete_account:{
      title: 'Apagar conta',
      description: `Deseja mesmo apagar sua conta?`,
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: () => handleUpdateDialogControlled(false),
        },
        {
          id: 'delete',
          label: 'Excluir',
          variant: 'primary',
          action: () => {
            handleUpdateDialogControlled(false)
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    }
  }

  const dialogItemToRender = dialogConfig[dialogSubmissionStep]

  return {
    dialogItemToRender,
  }
}
