import { ManagerUsersDialog } from '..'
import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { defaultTheme } from '../../../styles/themes/default'
import { AddDependentDialog } from '../components/AddDependentDialog'

interface DialogItemToRenderProps {
  handleUpdateDialogControlled: (open: boolean) => void
  deleteDependentDialog: () => void
  setDialogManagerUsersStep: any
  dialogManagerUsersStep: ManagerUsersDialog
  logoutConfig: any
}

export function useDialogItemToRender({
  handleUpdateDialogControlled,
  deleteDependentDialog,
  setDialogManagerUsersStep,
  dialogManagerUsersStep,
  logoutConfig,
}: DialogItemToRenderProps) {
  const dialogConfig: DialogConfig = {
    delete: {
      title: 'Excluir dependente',
      description:
        'Tem certeza de que deseja o dependente Gustavo Lima? Esta ação é irreversível e não será possível desfazê-la.',
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: () => {
            handleUpdateDialogControlled(false)
            setDialogManagerUsersStep('')
          },
        },
        {
          id: 'delete',
          label: 'Excluir',
          variant: 'primary',
          action: () => {
            deleteDependentDialog()
            setDialogManagerUsersStep('')
          },
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    },
    logout: logoutConfig,
    add_dependent: {
      title: 'Dependente',
      component: <AddDependentDialog />,
      description:
        'Informe o e-mail do seu dependente para que possamos cadastrá-lo para você.',
      width: '27.6rem',
    },
  }

  const dialogItemToRender = dialogConfig[dialogManagerUsersStep]

  return {
    dialogItemToRender,
  }
}
