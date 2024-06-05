// pages/Login/Login.tsx
import { useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import * as S from './styles'
import { LargeLogo } from '../../assets/largeLogo'
import { PrimaryButton } from '../../components/PrimaryButton'
import TypingEffect from '../../components/TypingEffect'
import { ArrowRight } from '../../assets/icons'
import InputField from '../../components/Input/InputField'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Skeleton } from '../../components/Skeleton'
import { LoginFormData, loginSchema } from './schema'
import { useLogin } from './hooks/useLogin'
import useNavigation from '../../hooks/useNavigation'

export function Login() {
  const navigatoTo = useNavigation()

  const { loading, onSubmit } = useLogin()
  const [imageLoaded, setImageLoaded] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

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
                navigatoTo('/signup')
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
