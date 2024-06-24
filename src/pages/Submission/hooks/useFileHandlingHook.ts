import { useMemo, useState } from 'react'
import { useFileUpload } from '../components/FileUploader/hooks/useFileUpload'
import { SUBMIT_EXAM_OPTIONS } from '../constants'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { isArrayEmpty, isArrayNotEmpty } from '../../../interfaces/typeGuards'

export function useFileHandlingHook() {
  const [isLoadingSubmissionTest, setIsLoadingSubmissionTest] = useState(false)
  const { getInputProps, getRootProps, loadingFiles } = useFileUpload()
  const { filesUploaded, setOptionToDelete, queryHook } =
    useSubmissionTestContext()
  const hasFiles = isArrayNotEmpty(filesUploaded)
  const hasNoFiles = isArrayEmpty(filesUploaded)

  const statusSubmitting = useMemo(() => {
    if (loadingFiles) return 'PENDING'
    if (hasNoFiles && !loadingFiles) return 'NO_FILE'
    return 'SUCCESS'
  }, [hasNoFiles, loadingFiles])

  const formattedFiles = filesUploaded.map((file) => ({
    name: file.test_name,
    id: file.id,
  }))

  const selectedOptionEnabledFormatted = SUBMIT_EXAM_OPTIONS[statusSubmitting]

  return {
    isLoadingSubmissionTest,
    setIsLoadingSubmissionTest,
    getInputProps,
    getRootProps,
    loadingFiles,
    filesUploaded,
    setOptionToDelete,
    queryHook,
    hasFiles,
    hasNoFiles,
    statusSubmitting,
    formattedFiles,
    selectedOptionEnabledFormatted,
  }
}
