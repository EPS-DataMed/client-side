import React, { useCallback, useState } from 'react'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { isArrayNotEmpty, isNotUndefined } from '../../interfaces/typeGuards'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import * as S from './styles'
import { ErrorToast, SuccessToast } from '../../components/Toast'
import { TableSkeleton } from './components/TableSkeleton'
import { TitleUpdater } from '../../components/TitleUpdater'
import { Empty } from '../../components/Empty'
import { GenericPage } from '../../components/GenericPage'
import { Breadcrumb } from '../../components/Breadcrumb'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Pen } from '../../assets/icons/pen'
import useNavigation from '../../hooks/useNavigation'
import { Dependent, FormStatus } from './interfaces'
import { useLogout } from '../../hooks/useLogout'
import { useUserContext } from '../../contexts/UserContext'
import { listDependentsRepository } from './repositories/listDependentsRepository'
import { calculateAge } from '../../utils/calculateAge'
import { deleteUserDependent } from './services'
import { getUserId } from '../../utils/getUserId'
import { getCookie } from '../../utils/cookies'

export type ManagerUsersDialog = 'delete' | 'logout' | 'add_dependent' | ''

export function ManagerUsers() {
  const [dialogManagerUsersStep, setDialogManagerUsersStep] =
    useState<ManagerUsersDialog>('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [dependentToDelete, setDependentToDelete] = useState<Dependent | null>(
    null,
  )

  const { dependents, isListDependentsLoading, setDependents } =
    listDependentsRepository()
  const navigateTo = useNavigation()
  const { isUserExists, isDoctor } = useUserContext()

  const handleOpenAddDependentDialog = () => {
    handleUpdateDialogControlled(true)
    setDialogManagerUsersStep('add_dependent')
  }

  const deleteDependentDialog = useCallback(async () => {
    const { userId } = getUserId()
    const token = getCookie('access_token')

    if (!dependentToDelete) return

    setIsDeleting(true)
    try {
      const updatedDependents = dependents.filter(
        (dependent) =>
          dependent.dependent_id !== dependentToDelete.dependent_id,
      )
      setDependents(updatedDependents)

      await deleteUserDependent({
        userId: userId as number,
        token: token as string,
        dependentId: dependentToDelete.dependent_id,
      })

      SuccessToast(
        isDoctor
          ? 'Paciente excluído com sucesso!'
          : 'Dependente excluído com sucesso!',
      )
    } catch (e) {
      ErrorToast(
        'Não foi possível realizar a ação, tente novamente mais tarde.',
      )
    } finally {
      setIsDeleting(false)
    }
  }, [dependentToDelete, dependents, isDoctor, setDependents])

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()
  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: handleUpdateDialogControlled,
    handleStep: setDialogManagerUsersStep,
  })

  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    deleteDependentDialog,
    dialogManagerUsersStep,
    setDialogManagerUsersStep,
    logoutConfig,
    dependentToDelete,
  })

  const handleDeleteDependent = useCallback(
    (dependent: Dependent) => {
      handleUpdateDialogControlled(true)
      setDialogManagerUsersStep('delete')
      setDependentToDelete(dependent)
    },
    [handleUpdateDialogControlled],
  )

  const STATUS_ACTION_OPTIONS = [
    {
      label: 'Exames',
      action: (dependent: Dependent) =>
        navigateTo(`/submission/manager/${dependent.dependent_id}`),
    },
    {
      label: 'Excluir',
      action: handleDeleteDependent,
    },
  ]

  const BREADCRUMBS = useBreadcrumbs()

  const STATUS_OPTIONS = {
    [FormStatus.Filled]: 'Preenchido',
    [FormStatus.InProgress]: 'Em andamento',
    [FormStatus.NotStarted]: 'Não iniciado',
  }

  const isDependentsListLoading = !isUserExists || isListDependentsLoading
  const hasDependents = isArrayNotEmpty(dependents) && !isListDependentsLoading

  const renderHeaderOptions = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonButton />
    }

    return (
      <PrimaryButton onClick={handleOpenAddDependentDialog}>
        <Pen />
        <p>{isDoctor ? 'Paciente' : 'Dependente'}</p>
      </PrimaryButton>
    )
  }

  const renderBreadcrumbs = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonBreadcrumbs />
    }

    return <Breadcrumb items={BREADCRUMBS} />
  }

  const renderPageTitle = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonTitle />
    }

    return (
      <GenericPage.Title data-testid="page-title">
        {isDoctor ? 'Pacientes' : 'Dependentes'}
      </GenericPage.Title>
    )
  }

  const renderPageDescription = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonDescription />
    }

    return (
      <GenericPage.Description data-testid="page-description">
        Mantenha todas as informações dos seus{' '}
        {isDoctor ? 'pacientes' : 'dependentes'} organizadas e acessíveis com
        facilidade.
      </GenericPage.Description>
    )
  }

  const renderTableContent = () => {
    if (isDependentsListLoading) {
      return <TableSkeleton />
    }

    return (
      <S.TableContentContainer>
        {dependents.map((item) => (
          <React.Fragment key={item.dependent_id}>
            <S.TableTitleCell title={item.user_full_name}>
              {item.user_full_name}
            </S.TableTitleCell>
            <S.TableCell>{calculateAge(item.user_birth_date)} anos</S.TableCell>
            <S.TableCell>
              <S.WrapperStatusIndicator>
                <S.StatusIndicator status={item.form_status} />
                {STATUS_OPTIONS[item.form_status]}
              </S.WrapperStatusIndicator>
            </S.TableCell>
            <S.TableCell hasGap>
              <S.WrapperButton>
                {STATUS_ACTION_OPTIONS.map((action) => (
                  <S.ButtonStyled
                    onClick={() => action.action(item)}
                    label={action.label}
                    key={action.label}
                  >
                    {action.label}
                  </S.ButtonStyled>
                ))}
              </S.WrapperButton>
            </S.TableCell>
          </React.Fragment>
        ))}
      </S.TableContentContainer>
    )
  }

  const renderEmptyState = () => {
    if (!hasDependents && !isDependentsListLoading) {
      return (
        <Empty
          text={`Ainda não há ${
            isDoctor ? 'pacientes' : 'dependentes'
          } cadastrados.`}
        />
      )
    }

    return null
  }

  return (
    <>
      <TitleUpdater title="Gerenciar dependentes" />
      <GenericPage.Root>
        <S.WrapperHeaderAndBreadcrumb>
          <GenericPage.Header>
            <S.WrapperLogoAndLogoTitle>
              <GenericPage.Logo />
              <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
            </S.WrapperLogoAndLogoTitle>
            <GenericPage.HeaderOptions>
              <GenericPage.ProfileButton />
              {renderHeaderOptions()}
              <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          {renderBreadcrumbs()}
        </S.WrapperHeaderAndBreadcrumb>
        <GenericPage.Divider />
        <S.MainContent>
          {(hasDependents || isDependentsListLoading) && (
            <>
              <S.WrapperPageInformation>
                {renderPageTitle()}
                {renderPageDescription()}
              </S.WrapperPageInformation>
              <S.TableContainer>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Idade</S.TableHeader>
                <S.TableHeader>Formulário</S.TableHeader>
                <S.TableHeader />
              </S.TableContainer>
              {renderTableContent()}
            </>
          )}
          {renderEmptyState()}
        </S.MainContent>
        <GenericPage.Divider />
      </GenericPage.Root>
      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          isLoadingRequisition={isDeleting}
          onClose={() => setDialogManagerUsersStep('')}
        />
      )}
    </>
  )
}
