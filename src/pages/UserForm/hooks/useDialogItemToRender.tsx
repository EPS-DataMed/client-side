import { DialogStatus } from '../../../components/Dialog/components/DialogStatus'
import { useTitleDialogStatus } from '../../../components/Dialog/components/DialogStatus/hooks/useTitleDialogStatus'
import { DialogConfig } from '../../../components/DialogControlled/interfaces'
import { DialogStep } from '../interfaces'

interface DialogItemToRenderProps {
  dialogSubmissionStep: DialogStep
  handleNavigationToSubmission: () => void
}

export function useDialogItemToRender({
  dialogSubmissionStep,
  handleNavigationToSubmission,
}: DialogItemToRenderProps) {
  const titleFormatted = useTitleDialogStatus({
    fullString: 'Formulário salvo com sucesso!',
    substring: 'sucesso!',
  })

  const dialogConfig: DialogConfig = {
    save_form: {
      component: (
        <DialogStatus.Root>
          <DialogStatus.AnimatedCheckIcon />
          <DialogStatus.Title>
            <div dangerouslySetInnerHTML={{ __html: titleFormatted }} />
          </DialogStatus.Title>
          <DialogStatus.Description>
            Você poderá editá-lo posteriormente. Deseja adicionar um novo exame
            ou gostaria de visualizar seu cartão de saúde?
          </DialogStatus.Description>
        </DialogStatus.Root>
      ),
      hideCloseButton: true,
      width: '29rem',
      marginTopWrapperButton: '24px',
      buttonConfig: [
        {
          id: 'add_new_test',
          label: 'Adicionar novo exame',
          variant: 'secondary',
          action: () => {
            handleNavigationToSubmission()
          },
        },
        {
          id: 'understand',
          label: 'Visualizar/ imprimir cartão',
          variant: 'primary',
          action: () => {
            console.log('Visualizar/ imprimir cartão')
          },
        },
      ],
    },
  }

  const dialogItemToRender = dialogConfig[dialogSubmissionStep]

  return {
    dialogItemToRender,
  }
}
