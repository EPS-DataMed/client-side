import { Breadcrumb } from '../../components/Breadcrumb'
import { GenericPage } from '../../components/GenericPage'
import { FileUploader } from './components/FileUploader'
import { StepBox } from './components/StepBox'
import { GhostIcon } from './components/StepBox/icons/GhostIcon'
import * as S from './styles'
import { SearchbarConfiguration } from '../../components/Searchbar'
import { ArrowRight } from '../../assets/icons'
import { DialogControlled } from '../../components/DialogControlled'
import { ProcessDataLoading } from './components/ProcessDataLoading'
import { SkeletonContainer } from './components/StepBox/styles'

import { useBreadcrumbsHook } from './hooks/useBreadcrumbsHook'
import { useFileHandlingHook } from './hooks/useFileHandlingHook'
import { useDialogHook } from './hooks/useDialogHook'
import { useLogoutHook } from './hooks/useLogoutHook'
import { useSubmissionTestHook } from './hooks/useSubmissionTestHook'
import { useUserContext } from '../../contexts/UserContext'
import { isNotUndefined } from '../../interfaces/typeGuards'
import { useListExamsRepository } from './repositories/useListExamsRepository'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'

export function Submission() {
  const BREADCRUMBS = useBreadcrumbsHook()
  const { isListExamsLoading } = useListExamsRepository()
  const {
    getInputProps,
    getRootProps,
    loadingFiles,
    filesUploaded,
    queryHook,
    hasFiles,
    hasNoFiles,
    formattedFiles,
    selectedOptionEnabledFormatted,
  } = useFileHandlingHook()

  const {
    handleOpenDialog,
    handleCloseDialog,
    handleUpdateDialogControlled,
    isDialogControlledOpen,
    setDialogSubmissionStep,
    dialogSubmissionStep,
  } = useDialogHook()

  const { handleOpenLogoutDialog, logoutConfig } = useLogoutHook(
    setDialogSubmissionStep,
    handleUpdateDialogControlled,
  )
  const { isUserExists } = useUserContext()
  const { handleSubmissionTest, isLoadingSubmissionTest } =
    useSubmissionTestHook(filesUploaded)

  const isLoadingRequests = isLoadingSubmissionTest || !isUserExists

  const { dialogItemToRender } = useDialogItemToRender({
    dialogSubmissionStep,
    handleUpdateDialogControlled,
    logoutConfig,
  })
  const renderBreadcrumbs = () => {
    if (!isUserExists) {
      return <S.SkeletonBreadcrumbs data-testid="skeleton-breadcrumbs" />
    }

    if (!isLoadingRequests) {
      return <Breadcrumb items={BREADCRUMBS} />
    }

    return null
  }

  return (
    <>
      <GenericPage.Root hasNoScrollbar>
        <S.WrapperHeaderAndBreadcrumb>
          <GenericPage.Header>
            <S.WrapperLogoAndLogoTitle>
              <GenericPage.Logo />
              <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
            </S.WrapperLogoAndLogoTitle>

            <GenericPage.HeaderOptions>
              <GenericPage.ProfileButton />
              <GenericPage.LogoutButton
                action={handleOpenLogoutDialog}
                data-testid="logout-button"
              />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          {renderBreadcrumbs()}
        </S.WrapperHeaderAndBreadcrumb>

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
                  gerenciar os campos que serão extraídos dos exames.
                </GenericPage.Description>
              </S.WrapperPageInformation>

              <S.WrrapperBoxes>
                {isListExamsLoading ? (
                  <SkeletonContainer data-testid="skeleton" />
                ) : (
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
                )}

                <StepBox
                  icon={selectedOptionEnabledFormatted.icon}
                  animation={selectedOptionEnabledFormatted.animation}
                  enabled={selectedOptionEnabledFormatted.enabled}
                  description={selectedOptionEnabledFormatted.message}
                  typeAnimation={selectedOptionEnabledFormatted.typeAnimation}
                  timeAnimation={selectedOptionEnabledFormatted.timeAnimation}
                  data-testid="step-box"
                  typeBox={hasFiles ? 'load_success' : undefined}
                  activeSkeleton={isListExamsLoading}
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
                    activeSkeleton={isListExamsLoading}
                  />
                )}

                {hasFiles && (
                  <StepBox
                    animation="vertical"
                    typeAnimation="infinite"
                    enabled={true}
                    data-testid="step-box-filled"
                    typeBox="list_tests"
                    activeSkeleton={isListExamsLoading}
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
