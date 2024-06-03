import { useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import * as S from './styles'
import { LargeLogo } from '../../assets/largeLogo'
import { PrimaryButton } from '../../components/PrimaryButton'
import TypingEffect from '../../components/TypingEffect'
import { ArrowRight } from '../../assets/icons'
import useNavigation from '../../hooks/useNavigation'
import { useUserContext } from '../../contexts/UserContext'
import InputField from '../../components/Input/InputField'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ErrorToast } from '../../components/Toast'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha é obrigatória'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function Login() {
  const { getUser } = useUserContext()
  const navigateTo = useNavigation()
  const [loading, setLoading] = useState(false)

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    const storedUser = getUser()
    if (
      data.email === storedUser.email &&
      data.password === storedUser.password
    ) {
      setLoading(true)
      console.log('User:', data)
      setTimeout(() => {
        setLoading(false)
        navigateTo('/home', { replace: true })
      }, 2000)
    } else {
      ErrorToast('E-mail ou senha inválida.')
    }
  }

  return (
    <Page.Background>
      <Page.Image alt="Doctor" src="src/pages/HomePage/assets/login.png" />
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
                navigateTo('/signup')
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
