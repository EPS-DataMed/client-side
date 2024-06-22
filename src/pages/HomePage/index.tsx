import { GenericPage } from '../../components/GenericPage'
import * as S from './styles'
import useNavigation from '../../hooks/useNavigation'
import { useState } from 'react'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { useLogout } from '../../hooks/useLogout'
import { ProfileButton } from '../../components/ProfileButton'
import { useWelcomeMessage } from './hooks/useWelcomeMessage'
import { useUserContext } from '../../contexts/UserContext'

export type HomePageDialog = 'logout' | ''

export function HomePage() {
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission/home/null')
  }

  const handleNavigationToManagerUsers = () => {
    navigateTo('/manager/users')
  }

  const { welcomeMessageText } = useWelcomeMessage()
  const { isDoctor } = useUserContext()

  const [imageManagerTestLoaded, setImageManagerTestLoaded] = useState(false)
  const [imageManagerPatientLoaded, setImageManagerPatientLoaded] =
    useState(false)

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
  })

  return (
    <>
      <GenericPage.Root hasNoScrollbar data-testid="generic-page-root">
        <S.Header data-testid="header">
          <S.WrapperLogoAndLogoTitle data-testid="logo-wrapper">
            <GenericPage.Logo data-testid="logo-icon" />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>

          <GenericPage.HeaderOptions data-testid="header-options">
            <ProfileButton data-testid="profile-button" />
            <GenericPage.LogoutButton
              dataTestId="logout-button"
              action={handleOpenLogoutDialog}
            />
          </GenericPage.HeaderOptions>
        </S.Header>

        <GenericPage.Divider data-testid="divider-top" />
        <S.MainContent data-testid="main-content">
          {welcomeMessageText ? (
            <S.WelcomeText data-testid="welcome-text">
              {welcomeMessageText}
            </S.WelcomeText>
          ) : (
            <S.SkeletonWelcomeText data-testid="skeleton-welcome-text" />
          )}
          <S.WelcomeQuestion data-testid="welcome-question">
            O que deseja acessar hoje?
          </S.WelcomeQuestion>

          <S.Options data-testid="options">
            {welcomeMessageText ? (
              <S.HomepageOption
                data-testid="homepage-option-submission"
                onClick={handleNavigationToSubmission}
              >
                <S.OptionTitle data-testid="option-title-submission">
                  Gerenciar Exames
                </S.OptionTitle>
                <S.OptionDescription data-testid="option-description-submission">
                  Envie seus exames e extraia seus dados de saúde.
                </S.OptionDescription>
                <S.ImageWrapper data-testid="image-wrapper-submission">
                  {!imageManagerTestLoaded && (
                    <S.SkeletonImage data-testid="skeleton-image-submission" />
                  )}
                  <S.Image
                    data-testid="image-submission"
                    src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/BlueCircleAndDoctor.png?raw=true"
                    onLoad={() => setImageManagerTestLoaded(true)}
                    style={{
                      display: imageManagerTestLoaded ? 'block' : 'none',
                    }}
                  />
                </S.ImageWrapper>
              </S.HomepageOption>
            ) : (
              <S.HomepageOptionSkeleton data-testid="homepage-option-skeleton-submission" />
            )}

            {welcomeMessageText ? (
              <S.HomepageOption
                data-testid="homepage-option-manager"
                onClick={handleNavigationToManagerUsers}
              >
                <S.OptionTitle data-testid="option-title-manager">
                  {isDoctor ? 'Gerenciar Pacientes' : 'Gerenciar Dependentes'}
                </S.OptionTitle>
                <S.OptionDescription data-testid="option-description-manager">
                  {isDoctor
                    ? 'Adicione e gerencie os exames do seu paciente.'
                    : 'Adicione e gerencie os exames dos seus dependentes.'}
                </S.OptionDescription>
                <S.ImageWrapper data-testid="image-wrapper-manager">
                  {!imageManagerPatientLoaded && (
                    <S.SkeletonImage data-testid="skeleton-image-manager" />
                  )}
                  <S.Image
                    data-testid="image-manager"
                    src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/BlueCircleAndExam.png?raw=true"
                    onLoad={() => setImageManagerPatientLoaded(true)}
                    style={{
                      display: imageManagerPatientLoaded ? 'block' : 'none',
                    }}
                  />
                </S.ImageWrapper>
              </S.HomepageOption>
            ) : (
              <S.HomepageOptionSkeleton data-testid="homepage-option-skeleton-manager" />
            )}
          </S.Options>
        </S.MainContent>
        <GenericPage.Divider data-testid="divider-bottom" />
      </GenericPage.Root>

      <DialogControlled
        isDialogControlledOpen={isDialogControlledOpen}
        handleUpdateDialogControlled={handleUpdateDialogControlled}
        dialogItemToRender={logoutConfig}
        isLoadingRequisition={false}
      />
    </>
  )
}
