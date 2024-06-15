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

export type HomePageDialog = 'logout' | ''

export function HomePage() {
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission/home')
  }

  const handleNavigationToManagerUsers = () => {
    navigateTo('/manager/users')
  }

  const navigateToUserData = () =>{
    navigateTo('/edituser')
  }

  // const firstName = user.name.split(' ')[0]
  // const greeting = user.sex === 'Masculino' ? 'Bem vindo' : 'Bem vinda '
  // const title = user.crm ? 'Dr. ' : ''
  // const welcomeMessageText = `${greeting}, ${title} ${firstName}!`
  // const firstLetter = user.name[0]
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
            <ProfileButton letter="D" />
            <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
          </GenericPage.HeaderOptions>
        </S.Header>

        <GenericPage.Divider />
        <S.MainContent>
          <S.WelcomeText>Bem vindo! </S.WelcomeText>
          <S.WelcomeQuestion>O que deseja acessar hoje?</S.WelcomeQuestion>

          <S.Options>
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
                  style={{ display: imageManagerTestLoaded ? 'block' : 'none' }}
                />
              </S.ImageWrapper>
            </S.HomepageOption>

            <S.HomepageOption onClick={handleNavigationToManagerUsers}>
              <S.OptionTitle>Gerenciar Pacientes</S.OptionTitle>
              <S.OptionDescription>
                Adicione e gerencie os exames do seu paciente.
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
