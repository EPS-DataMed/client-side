import { ReactNode, useCallback, useState } from 'react'
import { createContext, useContext } from 'use-context-selector'
import {
  OptionProps,
  SearchbarQueryHookReturnType,
  useSearchbarQuery,
} from '../components/Searchbar/hooks/useSearchbarQuery'
import { Exam, FormUserFieldProps } from '../pages/Submission/interfaces'
import { FormAndLatestTests, User } from '../pages/UserForm/interfaces'
import { convertFormToUser, divideUserFields } from '../pages/UserForm/utils'
import { hasObjectValidKeys, isNotNull } from '../interfaces/typeGuards'

interface SubmissionTestContextType {
  filesUploaded: Exam[]
  setFilesUploaded: React.Dispatch<React.SetStateAction<Exam[]>>
  setOptionToDelete: React.Dispatch<React.SetStateAction<OptionProps>>
  handleDeleteFileUpload: () => void
  optionToDelete: OptionProps
  queryHook: SearchbarQueryHookReturnType
  formData: User | null
  formUserFields: FormUserFieldProps | null
  hasFormData: boolean
  setProcessFormData: React.Dispatch<
    React.SetStateAction<FormAndLatestTests | null>
  >
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
  const [filesUploaded, setFilesUploaded] = useState<Exam[]>([])
  const [processFormData, setProcessFormData] =
    useState<FormAndLatestTests | null>(null)
  const [optionToDelete, setOptionToDelete] = useState<OptionProps>(
    {} as OptionProps,
  )

  const queryHook = useSearchbarQuery()

  const { setSelectedOption, setQuery } = queryHook

  const handleDeleteFileUpload = useCallback(() => {
    setFilesUploaded((prev) =>
      prev.filter((file) => file.id !== Number(optionToDelete.id)),
    )
    setSelectedOption({} as OptionProps)
    setQuery('')
  }, [optionToDelete.id, setQuery, setSelectedOption])

  const formData = isNotNull(processFormData)
    ? convertFormToUser(processFormData)
    : null
  const formUserFields = isNotNull(processFormData)
    ? divideUserFields(formData as User)
    : null

  const hasFormData = hasObjectValidKeys(processFormData)

  return (
    <SubmissionTestContext.Provider
      value={{
        filesUploaded,
        setFilesUploaded,
        setOptionToDelete,
        handleDeleteFileUpload,
        queryHook,
        optionToDelete,
        formData,
        setProcessFormData,
        formUserFields,
        hasFormData,
      }}
    >
      {children}
    </SubmissionTestContext.Provider>
  )
}

export function useSubmissionTestContext() {
  return useContext(SubmissionTestContext)
}
