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
import { ChangePasswordFormData, ChangePasswordSchema } from './schema'
import { ErrorToast, SuccessToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

export function ChangePassword() {
  const [loading, setLoading] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { control, handleSubmit } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const navigate = useNavigate()

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    setLoading(true)
    try {
      console.log(data)
      SuccessToast('Senha alterada com sucesso!')
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
          <S.Slogan>Por favor, informe sua nova senha e confirme.</S.Slogan>
        </Page.WrapperLogoAndText>

        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Nova Senha"
            name="password"
            type="password"
            control={control}
            description="Informe a sua nova senha."
            required
          />
          <InputField
            label="Confirme a Nova Senha"
            name="confirmPassword"
            type="password"
            control={control}
            description="Confirme a sua nova senha."
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
            Se desejar volte para o{' '}
            <S.Link
              onClick={() => {
                navigate('/')
              }}
            >
              login
            </S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
