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
    navigateTo('/submission/home')
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
      <GenericPage.Root hasNoScrollbar>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>

          <GenericPage.HeaderOptions>
            <ProfileButton />
            <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
          </GenericPage.HeaderOptions>
        </S.Header>

        <GenericPage.Divider />
        <S.MainContent>
          {welcomeMessageText ? (
            <S.WelcomeText>{welcomeMessageText}</S.WelcomeText>
          ) : (
            <S.SkeletonWelcomeText />
          )}
          <S.WelcomeQuestion>O que deseja acessar hoje?</S.WelcomeQuestion>

          <S.Options>
            {welcomeMessageText ? (
              <S.HomepageOption onClick={handleNavigationToSubmission}>
                <S.OptionTitle>Gerenciar Exames</S.OptionTitle>
                <S.OptionDescription>
                  Envie seus exames e extraia seus dados de saúde.
                </S.OptionDescription>
                <S.ImageWrapper>
                  {!imageManagerTestLoaded && <S.SkeletonImage />}
                  <S.Image
                    src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/BlueCircleAndDoctor.png?raw=true"
                    onLoad={() => setImageManagerTestLoaded(true)}
                    style={{
                      display: imageManagerTestLoaded ? 'block' : 'none',
                    }}
                  />
                </S.ImageWrapper>
              </S.HomepageOption>
            ) : (
              <S.HomepageOptionSkeleton />
            )}

            {welcomeMessageText ? (
              <S.HomepageOption onClick={handleNavigationToManagerUsers}>
                <S.OptionTitle>
                  {isDoctor ? 'Gerenciar Pacientes' : 'Gerenciar Dependentes'}
                </S.OptionTitle>
                <S.OptionDescription>
                  {isDoctor
                    ? 'Adicione e gerencie os exames do seu paciente.'
                    : 'Adicione e gerencie os exames dos seus dependentes.'}
                </S.OptionDescription>
                <S.ImageWrapper>
                  {!imageManagerPatientLoaded && <S.SkeletonImage />}
                  <S.Image
                    src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/BlueCircleAndExam.png?raw=true"
                    onLoad={() => setImageManagerPatientLoaded(true)}
                    style={{
                      display: imageManagerPatientLoaded ? 'block' : 'none',
                    }}
                  />
                </S.ImageWrapper>
              </S.HomepageOption>
            ) : (
              <S.HomepageOptionSkeleton />
            )}
          </S.Options>
        </S.MainContent>
        <GenericPage.Divider />
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
