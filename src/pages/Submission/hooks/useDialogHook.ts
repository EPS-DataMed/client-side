import { useState } from 'react'
import { useDialogControlled } from '../../../components/DialogControlled'
import { OptionProps } from '../../../components/Searchbar/hooks/useSearchbarQuery'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { DialogStep } from '../interfaces'

export function useDialogHook() {
  const { setOptionToDelete } = useSubmissionTestContext()

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  function handleOpenDialog(option: OptionProps) {
    handleUpdateDialogControlled(true)
    setDialogSubmissionStep('delete_mark')
    setOptionToDelete(option)
  }

  function handleCloseDialog() {
    setDialogSubmissionStep('')
    setOptionToDelete({} as OptionProps)
  }

  return {
    handleOpenDialog,
    handleCloseDialog,
    handleUpdateDialogControlled,
    isDialogControlledOpen,
    dialogSubmissionStep,
    setDialogSubmissionStep,
  }
}
