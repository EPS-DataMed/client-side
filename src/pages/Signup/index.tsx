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
    <Page.Background data-testid="signup-component">
      <Page.Content>
        <Page.WrapperLogoAndText>
          <LogoSVG height="91px" width="98px" data-testid="logo-svg" />
          <Page.LogoTitle>
            <TypingEffect text="Datamed" dataTestId="typing-effect-title" />
          </Page.LogoTitle>
          <Page.Slogan>
            <TypingEffect
              text="Tenha seus dados de saúde ao seu alcance."
              dataTestId="typing-effect-slogan"
            />
          </Page.Slogan>
        </Page.WrapperLogoAndText>

        <StatusIndicator currentStep={step} data-testid="status-indicator" />

        <S.SignupForm
          onSubmit={handleSubmit(onSubmit)}
          data-testid="signup-form"
        >
          <CurrentStep
            control={control}
            errors={errors}
            setStep={setStep}
            loading={loading}
            handleNextStep={handleNextStep}
            isMedicalInfoFilled={isMedicalInfoFilled}
            data-testid={`step${step}-component`}
          />
          <S.RegisterArea>
            <S.RegisterPhrase>
              Já possui conta? {''}
              <S.Link
                onClick={() => {
                  navigateTo('/')
                }}
                data-testid="navigate-login"
              >
                Ir para o login
              </S.Link>
            </S.RegisterPhrase>
          </S.RegisterArea>
        </S.SignupForm>
      </Page.Content>
      {!imageLoaded && (
        <Skeleton
          style={{ width: '50vw', height: '100%' }}
          data-testid="skeleton-loader"
        />
      )}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/signup.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        data-testid="signup-image"
      />
    </Page.Background>
  )
}
