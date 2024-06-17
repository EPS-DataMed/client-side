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
import { Dependent } from './interfaces'
import { useLogout } from '../../hooks/useLogout'
import { useUserContext } from '../../contexts/UserContext'

export const DEPENDENTS: Dependent[] = [
  {
    id: '1',
    name: 'Elvis Presley',
    createdAt: '2024-06-01T10:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '2',
    name: 'Michael Jackson',
    createdAt: '2024-06-02T11:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '3',
    name: 'Gugu Liberato',
    createdAt: '2024-06-03T12:00:00Z',
    status: 'concluded',
  },
  {
    id: '4',
    name: 'Alceu Valença',
    createdAt: '2024-06-04T13:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '5',
    name: 'Neymar Junior',
    createdAt: '2024-06-05T14:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '6',
    name: 'Lionel Messi',
    createdAt: '2024-06-06T15:00:00Z',
    status: 'concluded',
  },
  {
    id: '7',
    name: 'Adriano Imperador',
    createdAt: '2024-06-07T16:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '8',
    name: 'Leyla do Vôlei',
    createdAt: '2024-06-08T17:00:00Z',
    status: 'uninitiated',
  },
  {
    id: '9',
    name: 'Felipe Massa',
    createdAt: '2024-06-09T18:00:00Z',
    status: 'concluded',
  },
  {
    id: '10',
    name: 'José Euclides',
    createdAt: '2024-06-10T19:00:00Z',
    status: 'uninitiated',
  },
]

export type ManagerUsersDialog = 'delete' | 'logout' | 'add_dependent' | ''

export function ManagerUsers() {
  const [dependents, setDependents] = useState<Dependent[]>(DEPENDENTS)
  const [dialogManagerUsersStep, setDialogManagerUsersStep] =
    useState<ManagerUsersDialog>('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [dependentToDelete, setDependentToDelete] = useState<Dependent | null>(
    null,
  )

  const navigateTo = useNavigation()
  const { isUserExists, isDoctor } = useUserContext()

  const handleOpenAddDependentDialog = () => {
    handleUpdateDialogControlled(true)
    setDialogManagerUsersStep('add_dependent')
  }

  const deleteDependentDialog = useCallback(() => {
    if (dependentToDelete) {
      setIsDeleting(true)
      try {
        const updatedDependents = dependents.filter(
          (dependent) => dependent.id !== dependentToDelete.id,
        )
        setDependents(updatedDependents)
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
    }
  }, [dependentToDelete, dependents, isDoctor])

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
      action: () => navigateTo(`/submission/manager`),
    },
    {
      label: 'Excluir',
      action: handleDeleteDependent,
    },
  ]

  const BREADCRUMBS = useBreadcrumbs()

  const STATUS_OPTIONS = {
    uninitiated: 'Não iniciado',
    concluded: 'Preenchido',
  }

  const hasDependents = isArrayNotEmpty(dependents)
  const isDependentsListLoading = !isUserExists

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
              {isDependentsListLoading ? (
                <S.SkeletonButton />
              ) : (
                <PrimaryButton onClick={handleOpenAddDependentDialog}>
                  <Pen />
                  <p>{isDoctor ? 'Paciente' : 'Dependente'}</p>
                </PrimaryButton>
              )}
              <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          {isDependentsListLoading ? (
            <S.SkeletonBreadcrumbs />
          ) : (
            <Breadcrumb items={BREADCRUMBS} />
          )}
        </S.WrapperHeaderAndBreadcrumb>
        <GenericPage.Divider />
        <S.MainContent>
          {hasDependents ? (
            <>
              <S.WrapperPageInformation>
                {isDependentsListLoading ? (
                  <S.SkeletonTitle />
                ) : (
                  <GenericPage.Title data-testid="page-title">
                    {isDoctor ? 'Pacientes' : 'Dependentes'}
                  </GenericPage.Title>
                )}

                {isDependentsListLoading ? (
                  <S.SkeletonDescription />
                ) : (
                  <GenericPage.Description data-testid="page-description">
                    Mantenha todas as informações dos seus{' '}
                    {isDoctor ? 'pacientes' : 'dependentes'} organizadas e
                    acessíveis com facilidade.
                  </GenericPage.Description>
                )}
              </S.WrapperPageInformation>
              <S.TableContainer>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Data de entrada</S.TableHeader>
                <S.TableHeader>Formulário</S.TableHeader>
                <S.TableHeader />
              </S.TableContainer>
              {isDependentsListLoading ? (
                <TableSkeleton />
              ) : (
                <S.TableContentContainer>
                  {dependents.map((item) => (
                    <React.Fragment key={item.id}>
                      <S.TableTitleCell title={item.name}>
                        {item.name}
                      </S.TableTitleCell>
                      <S.TableCell>{item.createdAt}</S.TableCell>
                      <S.TableCell>
                        <S.WrapperStatusIndicator>
                          <S.StatusIndicator status={item.status} />
                          {STATUS_OPTIONS[item.status]}
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
              )}
            </>
          ) : (
            <Empty
              text={`Ainda não há ${
                isDoctor ? 'pacientes' : 'dependentes'
              } cadastrados.`}
            />
          )}
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
