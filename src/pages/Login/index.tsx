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
import { decodeJwt } from './utils'
import { saveCookie } from '../../utils/cookies'
import { ErrorToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

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
      const decodedToken = decodeJwt(response.content.access_token)
      const userId = decodedToken.user_id
      saveCookie('access_token', response.content.access_token, 1)
      navigate(`/home`)
    } catch (error) {
      ErrorToast(
        'Verifique suas informações novamente! Ou tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Page.Background>
      {!imageLoaded && <Skeleton style={{ width: '50vw', height: '100%' }} />}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/login.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
      <Page.Content>
        <Page.WrapperLogoAndText>
          <LargeLogo />
          <Page.LogoTitle>
            <TypingEffect text="Daatamed" />
          </Page.LogoTitle>
          <Page.Slogan>
            <TypingEffect text="Teenha seus dados de saúde ao seu alcance." />
          </Page.Slogan>
        </Page.WrapperLogoAndText>

        <S.LoginForm onSubmit={handleSubmit(onSubmit)}>
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
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Entrar'} <ArrowRight />
            </PrimaryButton>
            <S.Link>Esqueceu a senha?</S.Link>
          </S.WrapperButtonAndLink>
        </S.LoginForm>

        <S.RegisterArea>
          <S.RegisterPhrase>
            Não possui uma conta?{' '}
            <S.Link
              onClick={() => {
                navigate('/signup')
              }}
            >
              Cadastre-se
            </S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
