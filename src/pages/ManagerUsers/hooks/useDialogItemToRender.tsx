import { useCallback } from 'react'
import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { useUserContext } from '../../../contexts/UserContext'
import { defaultTheme } from '../../../styles/themes/default'
import { AddDependentDialog } from '../components/AddDependentDialog'
import { Dependent, ManagerUsersDialog } from '../interfaces'

interface DialogItemToRenderProps {
  handleUpdateDialogControlled: (open: boolean) => void
  deleteDependentDialog: any
  setDialogManagerUsersStep: React.Dispatch<
    React.SetStateAction<ManagerUsersDialog>
  >
  dialogManagerUsersStep: ManagerUsersDialog
  logoutConfig: any
  dependentToDelete: Dependent | null
}

export function useDialogItemToRender({
  handleUpdateDialogControlled,
  deleteDependentDialog,
  setDialogManagerUsersStep,
  dialogManagerUsersStep,
  logoutConfig,
  dependentToDelete,
}: DialogItemToRenderProps) {
  const { isDoctor } = useUserContext()

  const handleBackInDialog = useCallback(() => {
    handleUpdateDialogControlled(false)
    setDialogManagerUsersStep('')
  }, [handleUpdateDialogControlled, setDialogManagerUsersStep])

  const getDeleteDescription = () => {
    if (!dependentToDelete) return ''
    return (
      <div>
        Tem certeza de que deseja excluir o{' '}
        {isDoctor ? 'paciente' : 'dependente'}{' '}
        <strong>{dependentToDelete.user_full_name}</strong>? Esta ação é
        irreversível e não será possível desfazê-la.
      </div>
    )
  }

  const dialogConfig: DialogConfig = {
    delete: {
      title: isDoctor ? 'Excluir paciente' : 'Excluir dependente',
      description: getDeleteDescription(),
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: () => {
            handleBackInDialog()
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
      title: isDoctor ? 'Paciente' : 'Dependente',
      component: <AddDependentDialog onCloseDialog={handleBackInDialog} />,
      description: `Informe o e-mail do seu ${
        isDoctor ? 'paciente' : 'dependente'
      } para que possamos cadastrá-lo para você.`,
      width: '27.6rem',
    },
  }

  const dialogItemToRender = dialogConfig[dialogManagerUsersStep]

  return {
    dialogItemToRender,
  }
}
