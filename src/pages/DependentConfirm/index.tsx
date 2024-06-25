import { Skeleton } from '../../components/Skeleton'
import * as Page from '../../components/GenericSignupLoginPage'
import TypingEffect from '../../components/TypingEffect'
import { LargeLogo } from '../../assets/largeLogo'
import * as S from './styles'
import { PrimaryButton } from '../../components/PrimaryButton'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useDependentData } from './repositories/useDependentData'
import { Spinner } from '../../components/Spinner'

export function DependentConfirm() {
  const { user_id: userId, dependent_id: dependentId, token } = useParams()

  const [imageLoaded, setImageLoaded] = useState(false)
  const [loadingConfirm, setLoadingConfirm] = useState(false)
  const [loadingDeny, setLoadingDeny] = useState(false)

  const { user, isUserLoading, handleConfirmDependent, isEmailValid } =
    useDependentData(Number(userId), Number(dependentId), String(token))

  const textToDisplay = user?.doctor?.crm ? 'paciente' : 'dependente'

  return (
    <Page.Background data-testid="dependent-confirm-background">
      <Page.Content data-testid="dependent-confirm-content">
        <Page.WrapperLogoAndText data-testid="wrapper-logo-and-text">
          <LargeLogo data-testid="large-logo" />
          <Page.LogoTitle data-testid="logo-title">
            <TypingEffect text="Datamed" />
          </Page.LogoTitle>
          {isUserLoading ? (
            <S.SkeletonMessage data-testid="skeleton-message" />
          ) : (
            <Page.Slogan data-testid="page-slogan">
              Confirme se você é um {textToDisplay} <br /> de {user?.full_name}.
            </Page.Slogan>
          )}
        </Page.WrapperLogoAndText>
        <S.WrapperButtons data-testid="wrapper-buttons">
          <PrimaryButton
            data-testid="button-nao-sou"
            disabled={
              isUserLoading || loadingConfirm || loadingDeny || !isEmailValid
            }
            variant="secondary"
            type="button"
            onClick={() => handleConfirmDependent(false, setLoadingDeny)}
          >
            {loadingDeny ? (
              <>
                Carregando <Spinner data-testid="spinner-deny" />
              </>
            ) : (
              'Não sou'
            )}
          </PrimaryButton>
          <PrimaryButton
            data-testid="button-sou"
            disabled={
              isUserLoading || loadingConfirm || loadingDeny || !isEmailValid
            }
            type="submit"
            onClick={() => handleConfirmDependent(true, setLoadingConfirm)}
          >
            {loadingConfirm ? (
              <>
                Carregando <Spinner data-testid="spinner-confirm" />
              </>
            ) : (
              'Sou'
            )}
          </PrimaryButton>
        </S.WrapperButtons>
      </Page.Content>
      {!imageLoaded && (
        <Skeleton
          style={{ width: '50vw', height: '100%' }}
          data-testid="skeleton"
        />
      )}
      <Page.Image
        data-testid="page-image"
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/signup.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </Page.Background>
  )
}
