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
import { ErrorToast, SuccessToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

export function RecoverPassword() {
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { control, handleSubmit } = useForm<RecoverFormData>({
    resolver: zodResolver(RecoverSchema),
    defaultValues: {
      email: '',
    },
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<RecoverFormData> = async (data) => {
    setLoading(true)
    try {
      console.log(data)
      SuccessToast(
        'E-mail enviado com sucesso! Confira sua caixa de mensagens! Pode demorar um pouco, aguerde!',
      )
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
            <TypingEffect text="Datamed" />
          </Page.LogoTitle>
          <S.Slogan>
            Esqueceu sua senha? Nos informe o seu e-mail
            <br /> para que você possa recuperar.
          </S.Slogan>
        </Page.WrapperLogoAndText>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="E-mail"
            name="email"
            control={control}
            description="Informe o seu e-mail pessoal."
            required
          />

          <S.WrapperButtonAndLink>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Enviar'} <ArrowRight />
            </PrimaryButton>
          </S.WrapperButtonAndLink>
        </S.Form>

        <S.RegisterArea>
          <S.RegisterPhrase>
            Já possui uma conta?{' '}
            <S.Link
              onClick={() => {
                navigate('/')
              }}
            >
              Ir para o login
            </S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
