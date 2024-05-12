import { useState, useCallback } from 'react'

export interface DialogControlledState {
  isDialogControlledOpen: boolean
  handleUpdateDialogControlled: (open: boolean) => void
}

export function useDialogControlled(): DialogControlledState {
  const [isDialogControlledOpen, setIsDialogControlledOpen] = useState(false)
  const handleUpdateDialogControlled = useCallback((open: boolean) => {
    setIsDialogControlledOpen(open)
  }, [])

  return {
    isDialogControlledOpen,
    handleUpdateDialogControlled,
  }
}
