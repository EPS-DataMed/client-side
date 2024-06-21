import { useState, useCallback } from 'react'
import { GenericPage } from '../../components/GenericPage'
import { Breadcrumb } from '../../components/Breadcrumb'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { useSubmitHandlers } from './hooks/useSubmitHandlers'
import { ChangePasswordForm } from './components/ChangePasswordForm'
import { useLogout } from '../../hooks/useLogout'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { useBreadcrumbs } from './hooks/useBreadCrumbs'
import { EditFormData } from './schema'
import { DialogStep } from './interfaces/dialogStep'
import { DeleteUserForm } from './components/DeleteUserForm'
import * as S from './styles'
import { UserPersonalInformations } from './components/UserPersonalInformations'
import { isNotUndefined } from '../../interfaces/typeGuards'


export function EditUser() {
  const [passwordData, setPasswordData] = useState({} as EditFormData)
  const {
    loadingPasswordData,
    loadingDeleteAccount,
    handleSubmitChangePassword,
    handleSubmitDeleteAccount,
  } = useSubmitHandlers()

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  const handleOpenPasswordDialog = useCallback(
    (data: EditFormData) => {
      handleUpdateDialogControlled(true)
      setDialogSubmissionStep('change_password')
      setPasswordData(data)
    },
    [handleUpdateDialogControlled],
  )

  const handleOpenDeleteAccountDialog = () => {
    handleUpdateDialogControlled(true)
    setDialogSubmissionStep('delete_account')
  }

  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
    handleStep: (value: DialogStep) => setDialogSubmissionStep(value),
  })

  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    dialogSubmissionStep,
    onSubmitChangePassword: () => handleSubmitChangePassword(passwordData),
    onSubmitDeleteUser: handleSubmitDeleteAccount,
    logoutConfig,
  })

  const BREADCRUMBS = useBreadcrumbs()

  const handleCloseDialog = () => {
    setDialogSubmissionStep('')
  }

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
              <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          <Breadcrumb items={BREADCRUMBS} />
        </S.WrapperHeaderAndBreadcrumb>

        <GenericPage.Divider />

        <S.MainContent>
          <S.Section>
            <S.SectionTitle>Informações Pessoais</S.SectionTitle>
            <S.SectionDescription>
              Visualize suas informações pessoais
            </S.SectionDescription>
            <GenericPage.Divider />

            <S.UserDataInputs>
              <UserPersonalInformations />
            </S.UserDataInputs>
          </S.Section>

          <ChangePasswordForm onOpenDialog={handleOpenPasswordDialog} />
          <DeleteUserForm onOpenDialog={handleOpenDeleteAccountDialog} />
        </S.MainContent>

        <GenericPage.Divider />
      </GenericPage.Root>

      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          onClose={handleCloseDialog}
          isLoadingRequisition={loadingPasswordData || loadingDeleteAccount}
        />
      )}
    </>
  )
}
