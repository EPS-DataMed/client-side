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
import { ChangePasswordFormData, ChangePasswordSchema } from './schema'
import { Spinner } from '../../components/Spinner'
import { useChangePassword } from './hooks/useChangePassword'
import useNavigation from '../../hooks/useNavigation'
import { useParams } from 'react-router-dom'
import { useValidateEmailToken } from './hooks/useValidateEmailToken'

export function ChangePassword() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigateTo = useNavigation()
  const { token } = useParams()
  const { control, handleSubmit } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const { loading, onSubmit } = useChangePassword()
  const { data, isLoading } = useValidateEmailToken(String(token))

  const isTokenValid = data?.is_valid ?? false
  const isDisabled = !isTokenValid || loading || isLoading

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
            disabled={isDisabled}
          />
          <InputField
            label="Confirme a Nova Senha"
            name="confirmPassword"
            type="password"
            control={control}
            description="Confirme a sua nova senha."
            required
            disabled={isDisabled}
          />

          <S.WrapperButtonAndLink>
            <PrimaryButton type="submit" disabled={isDisabled}>
              {loading ? (
                <>
                  Carregando <Spinner />
                </>
              ) : (
                'Enviar'
              )}
              <ArrowRight />
            </PrimaryButton>
          </S.WrapperButtonAndLink>
        </S.Form>

        <S.RegisterArea>
          <S.RegisterPhrase>
            Se desejar volte para o{' '}
            <S.Link onClick={() => navigateTo('/')}>login</S.Link>
          </S.RegisterPhrase>
        </S.RegisterArea>
      </Page.Content>
    </Page.Background>
  )
}
