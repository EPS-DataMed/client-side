import { GenericPage } from '../../components/GenericPage'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ButtonsAndProfile } from '../../components/ButtonsAndProfile'
import { ProfileCircle } from '../../components/ProfileCircle'
import { Pen } from '../../assets/icons/pen'
import { Logout } from '../../assets/icons/logout'
import * as S from './styles'
import useNavigation from '../../hooks/useNavigation'
import { useState } from 'react'

export function HomePage() {
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission')
  }

  // const firstName = user.name.split(' ')[0]
  // const greeting = user.sex === 'Masculino' ? 'Bem vindo' : 'Bem vinda '
  // const title = user.crm ? 'Dr. ' : ''
  // const welcomeMessageText = `${greeting}, ${title} ${firstName}!`
  // const firstLetter = user.name[0]
  const [imageManagerTestLoaded, setImageManagerTestLoaded] = useState(false)
  const [imageManagerPatientLoaded, setImageManagerPatientLoaded] =
    useState(false)

  return (
    <>
      <GenericPage.Root hasNoScrollbar>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>

          <ButtonsAndProfile>
            <ProfileCircle>
              <p>D</p>
            </ProfileCircle>
            <PrimaryButton>
              <Pen />
              <p>Paciente</p>
            </PrimaryButton>
            <PrimaryButton variant="red">
              <Logout />
              <p>Sair</p>
            </PrimaryButton>
          </ButtonsAndProfile>
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

            <S.HomepageOption>
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
    </>
  )
}
