import React, { useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import * as S from './styles'
import TypingEffect from '../../components/TypingEffect'
import { Skeleton } from '../../components/Skeleton'
import { StatusIndicator } from '../../components/StatusIndicator'
import { Step1 } from './components/Step1'
import { Step2 } from './components/Step2'
import { Step3 } from './components/Step3'
import { useSignupForm } from './hooks/useSignupForm'
import { LogoSVG } from '../../assets/logo'
import useNavigation from '../../hooks/useNavigation'
import { StepProps } from './interfaces'

const steps: Record<number, React.ComponentType<StepProps>> = {
  1: Step1,
  2: Step2,
  3: Step3,
}

export function Signup() {
  const navigateTo = useNavigation()
  const [imageLoaded, setImageLoaded] = useState(false)
  const {
    step,
    setStep,
    control,
    handleSubmit,
    errors,
    loading,
    isMedicalInfoFilled,
    onSubmit,
    handleNextStep,
  } = useSignupForm()

  const CurrentStep = steps[step]

  return (
    <Page.Background>
      <Page.Content>
        <Page.WrapperLogoAndText>
          <LogoSVG height="91px" width="98px" />
          <Page.LogoTitle>
            <TypingEffect text="Daatamed" />
          </Page.LogoTitle>
          <Page.Slogan>
            <TypingEffect text="Teenha seus dados de saúde ao seu alcance." />
          </Page.Slogan>
        </Page.WrapperLogoAndText>

        <StatusIndicator currentStep={step} />

        <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
          <CurrentStep
            control={control}
            errors={errors}
            setStep={setStep}
            loading={loading}
            handleNextStep={handleNextStep}
            isMedicalInfoFilled={isMedicalInfoFilled}
          />
          <S.RegisterArea>
            <S.RegisterPhrase>
              Já possui conta? {''}
              <S.Link
                onClick={() => {
                  navigateTo('/')
                }}
              >
                Ir para o login
              </S.Link>
            </S.RegisterPhrase>
          </S.RegisterArea>
        </S.SignupForm>
      </Page.Content>
      {!imageLoaded && <Skeleton style={{ width: '50vw', height: '100%' }} />}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/signup.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </Page.Background>
  )
}
