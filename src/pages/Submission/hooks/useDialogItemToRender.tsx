import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { defaultTheme } from '../../../styles/themes/default'
import { DialogStep } from '../interfaces'

interface DialogItemToRenderProps {
  dialogSubmissionStep: DialogStep
  handleUpdateDialogControlled: (open: boolean) => void
}

export function useDialogItemToRender({
  handleUpdateDialogControlled,
  dialogSubmissionStep,
}: DialogItemToRenderProps) {
  const { handleDeleteFileUpload, optionToDelete } = useSubmissionTestContext()

  const dialogConfig: DialogConfig = {
    delete_mark: {
      title: 'Apagar arquivo',
      description: `Deseja excluir o arquivo ${optionToDelete.name}?`,
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
            handleDeleteFileUpload()
            handleUpdateDialogControlled(false)
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    },
  }

  const dialogItemToRender = dialogConfig[dialogSubmissionStep]

  return {
    dialogItemToRender,
  }
}
