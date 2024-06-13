import { Skeleton } from '../../components/Skeleton'
import * as Page from '../../components/GenericSignupLoginPage'
import TypingEffect from '../../components/TypingEffect'
import { LargeLogo } from '../../assets/largeLogo'
import { useState } from 'react'
import * as S from './styles'
import { PrimaryButton } from '../../components/PrimaryButton'

export function DependentConfirm() {
  const [imageLoaded, setImageLoaded] = useState(false)
  return (
    <Page.Background>
      <Page.Content>
        <Page.WrapperLogoAndText>
          <LargeLogo />
          <Page.LogoTitle>
            <TypingEffect text="Daatamed" />
          </Page.LogoTitle>
          <Page.Slogan>
            Confirme se você é um dependente <br /> de Fernando Silva Pereira.
          </Page.Slogan>
        </Page.WrapperLogoAndText>
        <S.WrapperButtons>
          <PrimaryButton variant="secondary" type="button">
            Não sou
          </PrimaryButton>
          <PrimaryButton type="submit">Sou</PrimaryButton>
        </S.WrapperButtons>
      </Page.Content>
      {!imageLoaded && <Skeleton style={{ width: '50vw', height: '100%' }} />}
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/signup.png?raw=true"
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? 'block' : 'none' }}
      />
    </Page.Background>
  )
}
