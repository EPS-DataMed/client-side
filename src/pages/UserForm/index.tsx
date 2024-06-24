import AdditionalInfo from './components/AdditionalInfo'
import PersonalInfo from './components/PersonalInfo'
import HealthData from './components/HealthData'
import { GenericPage } from '../../components/GenericPage'
import { Breadcrumb } from '../../components/Breadcrumb'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import * as S from './styles'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ArrowLeft } from '../../assets/icons'
import { DialogControlled } from '../../components/DialogControlled'
import { hasObjectValidKeys, isNotUndefined } from '../../interfaces/typeGuards'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { DialogStep } from './interfaces'
import DatamedCard from './DatamedCard'
import useRemoveSpecificSvg from './hooks/useRemoveSpecificSvg'
import { useLogout } from '../../hooks/useLogout'
import { listFormRepository } from './repositories/listFormRepository'

import { Spinner } from '../../components/Spinner'

import { useSubmitForm } from './hooks/useSubmitForm'
import { usePrintGraph } from './hooks/usePrintGraph'

export function UserForm() {
  const {
    setUserInfoFilled,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
    dialogSubmissionStep,
    handleNavigationToSubmission,
    handleSubmit,
    onSubmit,
    isLoadingSubmission,
    handleCloseDialog,
    isDialogControlledOpen,
    userInfoFilled,
    control,
  } = useSubmitForm()

  const { handleHealthDataPrint, healthDataRef } = usePrintGraph({
    setUserInfoFilled,
  })

  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
    handleStep: (value: DialogStep) => setDialogSubmissionStep(value),
  })

  const { dialogItemToRender } = useDialogItemToRender({
    dialogSubmissionStep,
    handleNavigationToSubmission,
    handleHealthDataPrint,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
    logoutConfig,
  })

  useRemoveSpecificSvg()
  listFormRepository()

  const BREADCRUMBS = useBreadcrumbs()

  return (
    <>
      <GenericPage.Root>
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
                dataTestId="logout-button"
              />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          <Breadcrumb items={BREADCRUMBS} />
        </S.WrapperHeaderAndBreadcrumb>

        <GenericPage.Divider />

        <S.MainContent>
          <S.WrapperPageInformation>
            <GenericPage.Title data-testid="page-title">
              Formulário
            </GenericPage.Title>
            <GenericPage.Description data-testid="page-description">
              Preencha o formulário abaixo com os campos faltantes, se houver.
              Ao final, conclua e gere um <b>cartão</b> com o resumo dessas
              informações de saúde. O cartão incluirá detalhes importantes como
              dados pessoais, informações de saúde e outros dados relevantes
              derivados dos exames. Ao finalizar, você terá a opção de imprimir
              o cartão.
            </GenericPage.Description>
          </S.WrapperPageInformation>

          <form onSubmit={handleSubmit(onSubmit)} data-testid="user-form">
            <PersonalInfo control={control} />
            <HealthData control={control} />
            <AdditionalInfo control={control} />

            <S.WrapperButton>
              <PrimaryButton
                type="button"
                variant="secondary"
                onClick={handleNavigationToSubmission}
                data-testid="back-button"
              >
                <ArrowLeft /> Voltar
              </PrimaryButton>
              <S.ButtonStyled type="submit" data-testid="submit-button">
                {isLoadingSubmission ? (
                  <>
                    Carregando <Spinner data-testid="spinner" />
                  </>
                ) : (
                  'Finalizar'
                )}
              </S.ButtonStyled>
            </S.WrapperButton>

            <GenericPage.Divider />
          </form>
        </S.MainContent>
      </GenericPage.Root>
      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          isLoadingRequisition={isLoadingSubmission}
          onClose={handleCloseDialog}
        />
      )}

      {hasObjectValidKeys(userInfoFilled) && (
        <S.PrintComponent>
          <DatamedCard user={userInfoFilled} componentRef={healthDataRef} />
        </S.PrintComponent>
      )}
    </>
  )
}
