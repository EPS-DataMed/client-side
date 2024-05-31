import { GenericPage } from '../../components/GenericPage'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ButtonsAndProfile } from '../../components/ButtonsAndProfile'
import { ProfileCircle } from '../../components/ProfileCircle'
import { Pen } from '../../assets/icons/pen'
import { Logout } from '../../assets/icons/logout'
import * as S from './styles'
import useNavigation from '../../hooks/useNavigation'

export function HomePage() {
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission')
  }
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
              <p>A</p>
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
          <S.WelcomeText>Bem vinda de volta, Ana!</S.WelcomeText>
          <S.WelcomeQuestion>O que deseja acessar hoje?</S.WelcomeQuestion>

          <S.Options>
            <S.HomepageOption onClick={handleNavigationToSubmission}>
              <S.OptionTitle>Gerenciar Exames</S.OptionTitle>
              <S.OptionDescription>
                Envie seus exames e extraia seus dados de saúde.
              </S.OptionDescription>
              <S.ImageWrapper>
                <S.Image src="src/pages/HomePage/assets/BlueCircleAndDoctor.png" />
              </S.ImageWrapper>
            </S.HomepageOption>

            <S.HomepageOption>
              <S.OptionTitle>Gerenciar Pacientes</S.OptionTitle>
              <S.OptionDescription>
                Adicione e gerencie os exames do seu paciente.
              </S.OptionDescription>
              <S.ImageWrapper>
                <S.Image src="src/pages/HomePage/assets/BlueCircleAndExam.png" />
              </S.ImageWrapper>
            </S.HomepageOption>
          </S.Options>
        </S.MainContent>
        <GenericPage.Divider />
      </GenericPage.Root>
    </>
  )
}
