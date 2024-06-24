import { GenericPage } from '../../components/GenericPage'
import { Breadcrumb } from '../../components/Breadcrumb'
import { DialogControlled } from '../../components/DialogControlled'
import { useSubmitHandlers } from './hooks/useSubmitHandlers'
import { ChangePasswordForm } from './components/ChangePasswordForm'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { useBreadcrumbs } from './hooks/useBreadCrumbs'
import { DeleteUserForm } from './components/DeleteUserForm'
import * as S from './styles'
import { UserPersonalInformations } from './components/UserPersonalInformations'
import { isNotUndefined } from '../../interfaces/typeGuards'

export function EditUser() {
  const {
    loadingPasswordData,
    loadingDeleteAccount,
    handleSubmitChangePassword,
    handleSubmitDeleteAccount,
    handleOpenLogoutDialog,
    handleOpenDeleteAccountDialog,
    logoutConfig,
    handleOpenPasswordDialog,
    passwordData,
    deletePasswordData,
    isDialogControlledOpen,
    dialogSubmissionStep,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
  } = useSubmitHandlers()

  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    dialogSubmissionStep,
    onSubmitChangePassword: () => handleSubmitChangePassword(passwordData),
    onSubmitDeleteUser: () => handleSubmitDeleteAccount(deletePasswordData),
    logoutConfig,
  })

  const BREADCRUMBS = useBreadcrumbs()

  const handleCloseDialog = () => {
    setDialogSubmissionStep('')
  }

  return (
    <>
      <S.Container data-test-id="edit-user-container">
        <S.WrapperHeaderAndBreadcrumb data-test-id="header-and-breadcrumb">
          <GenericPage.Header>
            <S.WrapperLogoAndLogoTitle>
              <GenericPage.Logo data-test-id="logo" />
              <GenericPage.LogoTitle data-test-id="logo-title">
                DataMed
              </GenericPage.LogoTitle>
            </S.WrapperLogoAndLogoTitle>

            <GenericPage.HeaderOptions>
              <GenericPage.ProfileButton data-test-id="profile-button" />
              <GenericPage.LogoutButton
                action={handleOpenLogoutDialog}
                data-test-id="logout-button"
              />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          <Breadcrumb items={BREADCRUMBS} data-test-id="breadcrumb" />
        </S.WrapperHeaderAndBreadcrumb>

        <GenericPage.Divider data-test-id="divider" />

        <S.MainContent data-test-id="main-content">
          <S.Section data-test-id="personal-info-section">
            <S.SectionTitle data-test-id="personal-info-title">
              Informações Pessoais
            </S.SectionTitle>
            <S.SectionDescription data-test-id="personal-info-description">
              Visualize suas informações pessoais
            </S.SectionDescription>
            <GenericPage.Divider data-test-id="personal-info-divider" />

            <S.UserDataInputs data-test-id="user-data-inputs">
              <UserPersonalInformations data-test-id="user-personal-info" />
            </S.UserDataInputs>
          </S.Section>

          <ChangePasswordForm
            onOpenDialog={handleOpenPasswordDialog}
            data-test-id="change-password-form"
          />
          <DeleteUserForm
            onOpenDialog={handleOpenDeleteAccountDialog}
            data-test-id="delete-user-form"
          />
        </S.MainContent>

        <GenericPage.Divider data-test-id="bottom-divider" />
      </S.Container>

      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          onClose={handleCloseDialog}
          isLoadingRequisition={loadingPasswordData || loadingDeleteAccount}
          data-test-id="dialog-controlled"
        />
      )}
    </>
  )
}
