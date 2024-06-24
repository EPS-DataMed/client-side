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
import { LoginFormData, loginSchema } from './schema'
import { login } from './services'
import { saveCookie } from '../../utils/cookies'
import { ErrorToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../../components/Spinner'

export function Login() {
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true)
    try {
      const response = await login(data)
      saveCookie('access_token', response.content.access_token, 30)
      navigate(`/home`)
    } catch (error) {
      ErrorToast('Verifique suas credenciais!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page.Background data-testid="login-background">
      {!imageLoaded && (
        <Skeleton
          style={{ width: '50vw', height: '100%' }}
          data-testid="login-skeleton"
        />
      )}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/login.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
        data-testid="login-image"
      />
      <Page.Content data-testid="login-content">
        <Page.WrapperLogoAndText data-testid="logo-and-text">
          <LargeLogo />
          <Page.LogoTitle>
            <TypingEffect text="Datamed" />
          </Page.LogoTitle>
          <Page.Slogan>
            <TypingEffect text="Tenha seus dados de saúde ao seu alcance." />
          </Page.Slogan>
        </Page.WrapperLogoAndText>

        <S.LoginForm onSubmit={handleSubmit(onSubmit)} data-testid="login-form">
          <InputField
            label="E-mail"
            name="email"
            control={control}
            description="Informe o seu e-mail pessoal."
            required
          />

          <InputField
            label="Senha"
            name="password"
            control={control}
            description="Informe a sua senha."
            type="password"
            required
          />

          <S.WrapperButtonAndLink>
            <PrimaryButton
              type="submit"
              disabled={loading}
              data-testid="submit-button"
            >
              {loading ? (
                <>
                  Carregando <Spinner />
                </>
              ) : (
                <>
                  Entrar <ArrowRight />
                </>
              )}
            </PrimaryButton>

            <S.Link
              onClick={() => {
                navigate('/recover')
              }}
              data-testid="forgot-password-link"
            >
              Esqueceu a senha?
            </S.Link>
          </S.WrapperButtonAndLink>
        </S.LoginForm>

        <S.RegisterArea>
          <S.RegisterPhrase>
            Não possui uma conta?{' '}
            <S.Link
              onClick={() => {
                navigate('/signup')
              }}
              data-testid="signup-link"
            >
              Cadastre-se
            </S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
