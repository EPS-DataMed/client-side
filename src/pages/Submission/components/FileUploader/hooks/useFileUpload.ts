import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSubmissionTestContext } from '../../../../../contexts/SubmissionTestContext'
import { ErrorToast, SuccessToast } from '../../../../../components/Toast'
import { uploadFiles } from '../../../services'
import { getUserId } from '../../../../../utils/getUserId'
import { getCookie } from '../../../../../utils/cookies'

type VariantFile = 'valid' | 'invalid'

export function useFileUpload() {
  const [loadingFiles, setLoadingFiles] = useState(false)
  const firstRender = useRef(true)
  const { userId } = getUserId()
  const token = getCookie('access_token')

  const { setFilesUploaded, filesUploaded } = useSubmissionTestContext()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoadingFiles(true)
      const duplicateNames = acceptedFiles.filter((file) =>
        filesUploaded.some(
          (existingFile) => existingFile.test_name === file.name,
        ),
      )

      if (duplicateNames.length > 0) {
        ErrorToast(
          'Nome duplicado, não é possível subir arquivos com o mesmo nome',
        )
        setLoadingFiles(false)
        return
      }

      try {
        const uploadResponse = await uploadFiles({
          token: token as string,
          files: acceptedFiles,
          userId: userId as number,
        })
        SuccessToast('Arquivos enviados com sucesso')

        const newFiles = Array.isArray(uploadResponse.data)
          ? uploadResponse.data
          : [uploadResponse.data]
        setFilesUploaded((prev) => [...prev, ...newFiles])
      } catch (error) {
        ErrorToast('Não foi possível enviar o arquivo!')
      } finally {
        setLoadingFiles(false)
      }
    },
    [filesUploaded, setFilesUploaded, token, userId],
  )

  const { getRootProps, getInputProps, isDragAccept, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: {
        'application/pdf': ['.pdf'],
      },
    })

  const onClearFile = (name: string) => {
    setFilesUploaded((prevFiles) =>
      prevFiles.filter((file) => file.test_name !== name),
    )
  }

  const variantFile: VariantFile = isDragAccept ? 'valid' : 'invalid'

  useEffect(() => {
    firstRender.current = false
  }, [])

  return {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragAccept,
    onDrop,
    onClearFile,
    loadingFiles,
    variantFile,
  }
}
