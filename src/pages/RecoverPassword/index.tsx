import { useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import * as S from './styles'
import { LargeLogo } from '../../assets/largeLogo'
import { PrimaryButton } from '../../components/PrimaryButton'
import TypingEffect from '../../components/TypingEffect'
import { ArrowRight } from '../../assets/icons'
import InputField from '../../components/Input/InputField'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '../../components/Skeleton'
import { RecoverFormData, RecoverSchema } from './schema'
import { Spinner } from '../../components/Spinner'
import { useForgotPassword } from './hooks/useForgotPassword'
import useNavigation from '../../hooks/useNavigation'

export function RecoverPassword() {
  const [imageLoaded, setImageLoaded] = useState(false)

  const { control, handleSubmit } = useForm<RecoverFormData>({
    resolver: zodResolver(RecoverSchema),
    defaultValues: {
      email: '',
    },
  })

  const navigateTo = useNavigation()
  const { submitForgotPassword, loading } = useForgotPassword()

  const onSubmit: SubmitHandler<RecoverFormData> = async (data) => {
    await submitForgotPassword(data)
  }

  return (
    <Page.Background data-testid="recover-password-background">
      {!imageLoaded && (
        <Skeleton
          style={{ width: '50vw', height: '100%' }}
          data-testid="skeleton"
        />
      )}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/login.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        data-testid="page-image"
      />
      <Page.Content data-testid="recover-password-content">
        <Page.WrapperLogoAndText data-testid="wrapper-logo-and-text">
          <LargeLogo data-testid="large-logo" />
          <Page.LogoTitle data-testid="logo-title">
            <TypingEffect text="Datamed" />
          </Page.LogoTitle>
          <S.Slogan data-testid="page-slogan">
            Esqueceu sua senha? Nos informe o seu e-mail
            <br /> para que você possa recuperar.
          </S.Slogan>
        </Page.WrapperLogoAndText>

        <S.Form onSubmit={handleSubmit(onSubmit)} data-testid="form">
          <InputField
            label="E-mail"
            name="email"
            control={control}
            description="Informe o seu e-mail pessoal."
            required
            data-testid="input-email"
          />

          <S.WrapperButtonAndLink data-testid="wrapper-button-and-link">
            <PrimaryButton
              type="submit"
              disabled={loading}
              data-testid="submit-button"
            >
              {loading ? (
                <>
                  Carregando <Spinner data-testid="spinner" />
                </>
              ) : (
                <>
                  Enviar <ArrowRight />
                </>
              )}
            </PrimaryButton>
          </S.WrapperButtonAndLink>
        </S.Form>

        <S.RegisterArea data-testid="register-area">
          <S.RegisterPhrase>
            Já possui uma conta?{' '}
            <S.Link
              onClick={() => {
                navigateTo('/')
              }}
              data-testid="login-link"
            >
              Ir para o login
            </S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
