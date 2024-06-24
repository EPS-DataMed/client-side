import React, { useCallback, useState } from 'react'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { isArrayNotEmpty, isNotUndefined } from '../../interfaces/typeGuards'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import * as S from './styles'
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

export type ManagerUsersDialog = 'delete' | 'logout' | 'add_dependent' | ''

export function ManagerUsers() {
  const [dialogManagerUsersStep, setDialogManagerUsersStep] =
    useState<ManagerUsersDialog>('')

  const {
    dependents,
    isListDependentsLoading,
    deleteDependentDialog,
    dependentToDelete,
    setDependentToDelete,
    isDeleting,
  } = listDependentsRepository()
  const navigateTo = useNavigation()
  const { isUserExists, isDoctor } = useUserContext()

  const handleOpenAddDependentDialog = () => {
    handleUpdateDialogControlled(true)
    setDialogManagerUsersStep('add_dependent')
  }

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
    [handleUpdateDialogControlled, setDependentToDelete],
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
    [FormStatus.Empty]: 'Não iniciado',
  }

  const isDependentsListLoading = !isUserExists || isListDependentsLoading
  const hasDependents = isArrayNotEmpty(dependents) && !isListDependentsLoading

  const renderHeaderOptions = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonButton data-testid="skeleton-button" />
    }

    return (
      <PrimaryButton
        onClick={handleOpenAddDependentDialog}
        data-testid="add-dependent-button"
      >
        <Pen />
        <p>{isDoctor ? 'Paciente' : 'Dependente'}</p>
      </PrimaryButton>
    )
  }

  const renderBreadcrumbs = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonBreadcrumbs data-testid="skeleton-breadcrumbs" />
    }

    return <Breadcrumb items={BREADCRUMBS} />
  }

  const renderPageTitle = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonTitle data-testid="skeleton-title" />
    }

    return (
      <GenericPage.Title data-testid="page-title">
        {isDoctor ? 'Pacientes' : 'Dependentes'}
      </GenericPage.Title>
    )
  }

  const renderPageDescription = () => {
    if (isDependentsListLoading) {
      return <S.SkeletonDescription data-testid="skeleton-description" />
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
      return <TableSkeleton data-testid="table-skeleton" />
    }

    return (
      <S.TableContentContainer data-testid="table-content-container">
        {dependents.map((item) => (
          <React.Fragment key={item.dependent_id}>
            <S.TableTitleCell
              title={item.user_full_name}
              data-testid={`dependent-name-${item.dependent_id}`}
            >
              {item.user_full_name}
            </S.TableTitleCell>
            <S.TableCell data-testid={`dependent-age-${item.dependent_id}`}>
              {calculateAge(item.user_birth_date)} anos
            </S.TableCell>
            <S.TableCell data-testid={`dependent-status-${item.dependent_id}`}>
              <S.WrapperStatusIndicator>
                <S.StatusIndicator status={item.form_status} />
                {STATUS_OPTIONS[item.form_status]}
              </S.WrapperStatusIndicator>
            </S.TableCell>
            <S.TableCell
              hasGap
              data-testid={`dependent-actions-${item.dependent_id}`}
            >
              <S.WrapperButton>
                {STATUS_ACTION_OPTIONS.map((action) => (
                  <S.ButtonStyled
                    onClick={() => action.action(item)}
                    label={action.label}
                    key={action.label}
                    data-testid={`action-button-${action.label.toLowerCase()}-${
                      item.dependent_id
                    }`}
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
          data-testid="empty-state"
        />
      )
    }

    return null
  }

  return (
    <>
      <TitleUpdater title="Gerenciar dependentes" />
      <GenericPage.Root
        hasNoScrollbar={!hasDependents && !isDependentsListLoading}
      >
        <S.WrapperHeaderAndBreadcrumb>
          <GenericPage.Header>
            <S.WrapperLogoAndLogoTitle>
              <GenericPage.Logo />
              <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
            </S.WrapperLogoAndLogoTitle>
            <GenericPage.HeaderOptions>
              <GenericPage.ProfileButton />
              {renderHeaderOptions()}
              <GenericPage.LogoutButton
                action={handleOpenLogoutDialog}
                dataTestId="logout-button"
              />
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
                <S.TableHeader data-testid="table-header-name">
                  Nome
                </S.TableHeader>
                <S.TableHeader data-testid="table-header-age">
                  Idade
                </S.TableHeader>
                <S.TableHeader data-testid="table-header-form">
                  Formulário
                </S.TableHeader>
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
