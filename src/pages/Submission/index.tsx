import { useMemo, useState } from 'react'
import { Breadcrumb } from '../../components/Breadcrumb'
import { GenericPage } from '../../components/GenericPage'
import { useSubmissionTestContext } from '../../contexts/SubmissionTestContext'
import {
  isArrayEmpty,
  isArrayNotEmpty,
  isNotUndefined,
} from '../../interfaces/typeGuards'
import { FileUploader } from './components/FileUploader'
import { useFileUpload } from './components/FileUploader/hooks/useFileUpload'
import { StepBox } from './components/StepBox'
import { GhostIcon } from './components/StepBox/icons/GhostIcon'
import * as S from './styles'
import { SearchbarConfiguration } from '../../components/Searchbar'
import { ArrowRight } from '../../assets/icons'
import { OptionProps } from '../../components/Searchbar/hooks/useSearchbarQuery'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { DialogStep } from './interfaces'
import { SUBMIT_EXAM_OPTIONS } from './constants'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import { ProcessDataLoading } from './components/ProcessDataLoading'

export function Submission() {
  const [isLoadingSubmissionTest, setIsLoadingSubmissionTest] = useState(false)
  const { getInputProps, getRootProps, loadingFiles } = useFileUpload()
  const { filesUploaded, setOptionToDelete, queryHook } =
    useSubmissionTestContext()

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    dialogSubmissionStep,
  })

  const BREADCRUMBS = useBreadcrumbs()

  function handleSubmissionTest() {
    setIsLoadingSubmissionTest(true)
  }

  const hasFiles = isArrayNotEmpty(filesUploaded)
  const hasNoFiles = isArrayEmpty(filesUploaded)

  const statusSubmitting = useMemo(() => {
    if (loadingFiles) return 'PENDING'
    if (hasNoFiles && !loadingFiles) return 'NO_FILE'
    return 'SUCCESS'
  }, [hasNoFiles, loadingFiles])

  const formattedFiles = filesUploaded.map((file) => {
    return {
      name: file.name,
      id: file.id,
    }
  })

  const selectedOptionEnabledFormatted = SUBMIT_EXAM_OPTIONS[statusSubmitting]

  function handleOpenDialog(option: OptionProps) {
    handleUpdateDialogControlled(true)
    setDialogSubmissionStep('delete_mark')
    setOptionToDelete(option)
  }

  function handleCloseDialog() {
    setDialogSubmissionStep('')
    setOptionToDelete({} as OptionProps)
  }

  return (
    <>
      <GenericPage.Root hasNoScrollbar>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>
          <Breadcrumb items={BREADCRUMBS} />
        </S.Header>

        <GenericPage.Divider />

        <S.MainContent>
          {isLoadingSubmissionTest ? (
            <ProcessDataLoading />
          ) : (
            <>
              <S.WrapperPageInformation>
                <GenericPage.Title data-testid="page-title">
                  Enviar exames
                </GenericPage.Title>
                <GenericPage.Description data-testid="page-description">
                  Faça o <b>upload</b> de <b>exames médicos</b> e gerencie-os.
                  Esta etapa tem como objetivo selecionar um exame anexado para,
                  em seguida, avançar para a próxima etapa, que consiste em
                  gerenciar os campos que serão extraídos do exame.
                </GenericPage.Description>
              </S.WrapperPageInformation>

              <S.WrrapperBoxes>
                <FileUploader.FileUploader
                  success={hasFiles}
                  {...getRootProps()}
                  variant={'valid'}
                  data-testid="file-uploader"
                >
                  <FileUploader.AnimationUploadIcon>
                    <FileUploader.UploadIcon success={hasFiles} />
                  </FileUploader.AnimationUploadIcon>
                  <div>
                    <FileUploader.WrapperIconAndMessageUpload>
                      <FileUploader.MessageUpload>
                        Arraste seu(s) exame(s) aqui ou{' '}
                        <FileUploader.MessageUploadBold>
                          clique para buscar
                        </FileUploader.MessageUploadBold>{' '}
                        em seu computador.
                      </FileUploader.MessageUpload>
                    </FileUploader.WrapperIconAndMessageUpload>

                    <FileUploader.MessageUploadDescription>
                      Apenas arquivos no formato <b>pdf</b> são permitidos.
                    </FileUploader.MessageUploadDescription>
                  </div>

                  <input
                    name="dropzone-file"
                    {...getInputProps()}
                    data-testid="thumbnail-file"
                  />
                </FileUploader.FileUploader>

                <StepBox
                  icon={selectedOptionEnabledFormatted.icon}
                  animation={selectedOptionEnabledFormatted.animation}
                  enabled={selectedOptionEnabledFormatted.enabled}
                  description={selectedOptionEnabledFormatted.message}
                  typeAnimation={selectedOptionEnabledFormatted.typeAnimation}
                  timeAnimation={selectedOptionEnabledFormatted.timeAnimation}
                  data-testid="step-box"
                  typeBox={hasFiles ? 'load_success' : undefined}
                />

                {!hasFiles && (
                  <StepBox
                    animation="vertical"
                    typeAnimation="infinite"
                    icon={GhostIcon}
                    timeAnimation="2s"
                    enabled={!loadingFiles && hasFiles}
                    description="Sua lista de exames está vazia. Adicione seu(s) exame(s) e visualize-os aqui."
                    data-testid="step-box-empty"
                  />
                )}

                {hasFiles && (
                  <StepBox
                    animation="vertical"
                    typeAnimation="infinite"
                    enabled={true}
                    data-testid="step-box-filled"
                    typeBox="list_tests"
                  >
                    <S.UploadedDocumentsContainer data-testid="uploaded-documents-container">
                      <S.WrapperInformations>
                        <S.Title>Exames carregados</S.Title>
                        <S.Description>
                          Abaixo estão seus exames carregados. Você pode
                          excluí-los ou avançar a proxima etapa.
                        </S.Description>
                        <SearchbarConfiguration
                          {...queryHook}
                          options={formattedFiles}
                          onDeleteItem={handleOpenDialog}
                          data-testid="searchbar-configuration"
                        />
                      </S.WrapperInformations>

                      <S.AdvanceButton
                        variant={'success'}
                        onClick={handleSubmissionTest}
                        disabled={hasNoFiles}
                        data-testid="advance-button"
                      >
                        Avançar
                        <ArrowRight />
                      </S.AdvanceButton>
                    </S.UploadedDocumentsContainer>
                  </StepBox>
                )}
              </S.WrrapperBoxes>
            </>
          )}
        </S.MainContent>

        <GenericPage.Divider />
      </GenericPage.Root>

      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          isLoadingRequisition={false}
          onClose={handleCloseDialog}
        />
      )}
    </>
  )
}
