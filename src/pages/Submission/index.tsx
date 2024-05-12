import { useMemo, useState } from 'react'
import { Breadcrumb, BreadcrumbItem } from '../../components/Breadcrumb'
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
import { CheckIcon } from './components/StepBox/icons/CheckIcon'
import { GhostIcon } from './components/StepBox/icons/GhostIcon'
import { LoadFileIcon } from './components/StepBox/icons/LoadFileIcon'
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

interface EnabledOptionProps {
  [key: string]: {
    message: string
    icon: () => JSX.Element | null
    animation: 'slide' | 'vertical' | 'rotate' | 'fadeIn'
    typeAnimation: 'infinite' | 'linear' | 'ease-in-out'
    enabled: boolean
    timeAnimation: string
  }
}

export function Submission() {
  const { getInputProps, getRootProps, loadingFiles } = useFileUpload()
  const { filesUploaded, setOptionToDelete, queryHook } =
    useSubmissionTestContext()

  const { selectedOption } = queryHook

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    dialogSubmissionStep,
  })

  const BREADCRUMBS: BreadcrumbItem[] = [
    {
      label: 'Pacientes',
      action: () => console.log('Pacientes'),
    },
    {
      label: 'Enviar exames',
      activate: true,
    },
  ]

  const hasFiles = isArrayNotEmpty(filesUploaded)
  const hasNoFiles = isArrayEmpty(filesUploaded)

  const statusSubmitting = useMemo(() => {
    if (loadingFiles) return 'PENDING'
    if (hasNoFiles && !loadingFiles) return 'NO_FILE'
    return 'SUCCESS'
  }, [hasNoFiles, loadingFiles])

  const SUBMIT_EXAM_OPTIONS: EnabledOptionProps = {
    SUCCESS: {
      message: `Exame(s) carregados com sucesso! Gerencie-os ao lado.`,
      icon: CheckIcon,
      animation: 'fadeIn',
      typeAnimation: 'linear',
      enabled: true,
      timeAnimation: '2s',
    },
    NO_FILE: {
      message: `Não existem exame(s) para serem carregados.`,
      icon: LoadFileIcon,
      animation: 'slide',
      typeAnimation: 'infinite',
      enabled: false,
      timeAnimation: '2s',
    },
    PENDING: {
      message: `Carregando arquivo(s)...`,
      icon: LoadFileIcon,
      animation: 'rotate',
      typeAnimation: 'infinite',
      enabled: true,
      timeAnimation: '2s',
    },
  }

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

  console.log('selectedOption: ', selectedOption)
  return (
    <>
      <GenericPage.Root>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>
          <Breadcrumb items={BREADCRUMBS} />
        </S.Header>

        <GenericPage.Divider />

        <S.MainContent>
          <S.WrapperPageInformation>
            <GenericPage.Title>Enviar exames</GenericPage.Title>
            <GenericPage.Description>
              Faça o <b>upload</b> de <b>exames médicos</b> e gerencie-os. Esta
              etapa tem como objetivo selecionar um exame anexado para, em
              seguida, avançar para a próxima etapa, que consiste em gerenciar
              os campos que serão extraídos do exame.
            </GenericPage.Description>
          </S.WrapperPageInformation>

          <S.WrrapperBoxes>
            <FileUploader.FileUploader {...getRootProps()} variant={'valid'}>
              <FileUploader.AnimationUploadIcon>
                <FileUploader.UploadIcon />
              </FileUploader.AnimationUploadIcon>
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
                Apenas arquivos no formato pdf são permitidos.
              </FileUploader.MessageUploadDescription>
              <input
                name="dropzone-file"
                {...getInputProps()}
                data-testid="thumbnail-fille"
              />
            </FileUploader.FileUploader>

            <StepBox
              icon={selectedOptionEnabledFormatted.icon}
              animation={selectedOptionEnabledFormatted.animation}
              enabled={selectedOptionEnabledFormatted.enabled}
              description={selectedOptionEnabledFormatted.message}
              typeAnimation={selectedOptionEnabledFormatted.typeAnimation}
              timeAnimation={selectedOptionEnabledFormatted.timeAnimation}
            />

            {!hasFiles && (
              <StepBox
                animation="vertical"
                typeAnimation="infinite"
                icon={GhostIcon}
                timeAnimation="2s"
                enabled={!loadingFiles && hasFiles}
                description="Sua lista de exames está vazia. Adicione seu(s) exame(s) e visualize-os aqui."
              />
            )}

            {hasFiles && (
              <StepBox
                animation="vertical"
                typeAnimation="infinite"
                enabled={true}
              >
                <S.UploadedDocumentsContainer>
                  <S.WrapperInformations>
                    <S.Title>Exames carregados</S.Title>
                    <S.Description>
                      Selecione um exame para avançar a próxima etapa e em
                      seguida clique em avançar.
                    </S.Description>
                    <SearchbarConfiguration
                      {...queryHook}
                      options={formattedFiles}
                      onDeleteItem={handleOpenDialog}
                    />
                  </S.WrapperInformations>

                  <S.AdvanceButton
                    variant={'primary'}
                    onClick={() => console.log('avançou')}
                    disabled={!selectedOption?.name}
                  >
                    Avançar
                    <ArrowRight />
                  </S.AdvanceButton>
                </S.UploadedDocumentsContainer>
              </StepBox>
            )}
          </S.WrrapperBoxes>
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
