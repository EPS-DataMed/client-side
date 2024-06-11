import { useCallback, useEffect, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSubmissionTestContext } from '../../../../../contexts/SubmissionTestContext'
import { ErrorToast, SuccessToast } from '../../../../../components/Toast'
import { generateRandomId } from '../../../../../utils/mockFunctions'
import { uploadFiles } from '../../../services'

type VariantFile = 'valid' | 'invalid'

export function useFileUpload() {
  const [loadingFiles, setLoadingFiles] = useState(false)
  const firstRender = useRef(true)

  const { setFilesUploaded, filesUploaded } = useSubmissionTestContext()

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoadingFiles(true)
      const duplicateNames = acceptedFiles.filter((file) =>
        filesUploaded.some((existingFile) => existingFile.name === file.name),
      )

      if (duplicateNames.length > 0) {
        ErrorToast(
          'Nome duplicado, não é possível subir arquivos com o mesmo nome',
        )
        setLoadingFiles(false)
        return
      }

      try {
        const uploadResponse = await uploadFiles(acceptedFiles, 9)
        SuccessToast('Arquivos enviados com sucesso')

        setFilesUploaded((prevFiles) =>
          prevFiles.concat(
            acceptedFiles.map((file) => ({
              name: file.name,
              url: uploadResponse.url || 'www.example.com',
              id: generateRandomId(),
            })),
          ),
        )
      } catch (error) {
        ErrorToast('Não foi possível enviar o arquivo!')
      } finally {
        setLoadingFiles(false)
      }
    },
    [filesUploaded, setFilesUploaded, setLoadingFiles],
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
      prevFiles.filter((file) => file.name !== name),
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
