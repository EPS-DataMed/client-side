import { ReactNode, useCallback, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'
import {
  OptionProps,
  SearchbarQueryHookReturnType,
  useSearchbarQuery,
} from '../components/Searchbar/hooks/useSearchbarQuery'

export type Files = {
  name: string
  url: string
  id: string
}[]

interface SubmissionTestContextType {
  filesUploaded: Files
  setFilesUploaded: React.Dispatch<React.SetStateAction<Files>>
  setOptionToDelete: React.Dispatch<React.SetStateAction<OptionProps>>
  handleDeleteFileUpload: () => void
  optionToDelete: OptionProps
  queryHook: SearchbarQueryHookReturnType
}

interface SubmissionTestProviderProps {
  children: ReactNode
}

export const SubmissionTestContext = createContext(
  {} as SubmissionTestContextType,
)

export function SubmissionTestProvider({
  children,
}: SubmissionTestProviderProps) {
  const [filesUploaded, setFilesUploaded] = useState<Files>([])
  const [optionToDelete, setOptionToDelete] = useState<OptionProps>(
    {} as OptionProps,
  )

  const queryHook = useSearchbarQuery()

  const { setSelectedOption, setQuery } = queryHook

  const handleDeleteFileUpload = useCallback(() => {
    setFilesUploaded((prev) =>
      prev.filter((file) => file.id !== optionToDelete.id),
    )
    setSelectedOption({} as OptionProps)
    setQuery('')
  }, [optionToDelete.id, setQuery, setSelectedOption])

  return (
    <SubmissionTestContext.Provider
      value={{
        filesUploaded,
        setFilesUploaded,
        setOptionToDelete,
        handleDeleteFileUpload,
        queryHook,
        optionToDelete,
      }}
    >
      {children}
    </SubmissionTestContext.Provider>
  )
}

export function useSubmissionTestContext() {
  return useContext(SubmissionTestContext)
}
