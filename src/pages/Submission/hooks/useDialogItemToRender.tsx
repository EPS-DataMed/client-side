import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { SuccessToast } from '../../../components/Toast'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { defaultTheme } from '../../../styles/themes/default'
import { getCookie } from '../../../utils/cookies'
import { getUserId } from '../../../utils/getUserId'
import { DialogStep } from '../interfaces'
import { deleteFile } from '../services'

interface DialogItemToRenderProps {
  dialogSubmissionStep: DialogStep
  handleUpdateDialogControlled: (open: boolean) => void
  logoutConfig: any
}

export function useDialogItemToRender({
  handleUpdateDialogControlled,
  dialogSubmissionStep,
  logoutConfig,
}: DialogItemToRenderProps) {
  const { handleDeleteFileUpload, optionToDelete } = useSubmissionTestContext()

  const { userId } = getUserId()
  const token = getCookie('access_token')

  function deleteExam() {
    deleteFile({
      fileId: Number(optionToDelete.id),
      userId: userId as number,
      token: token as string,
    })
    handleDeleteFileUpload()
    handleUpdateDialogControlled(false)
    SuccessToast('Exame deletado com sucesso!')
  }

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
            deleteExam()
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    },
    logout: logoutConfig,
  }

  const dialogItemToRender = dialogConfig[dialogSubmissionStep]

  return {
    dialogItemToRender,
  }
}
