import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { GenericPage } from '../../components/GenericPage'
import { Input } from '../../components/Input'
import * as S from './styles'
import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'
import { LargeLogo } from '../../assets/largeLogo'
import { PrimaryButton } from '../../components/PrimaryButton'

export function Login() {


    return (

        <Page.Background>
            
            <Page.Image>
                <LoginImage/>
            </Page.Image>
            <Page.Content>
                <Page.WrapperLogoAndText>
                    <LargeLogo/>
                    <Page.LogoTitle>Datamed</Page.LogoTitle>
                    <Page.Slogan>Tenha seus dados de saúde ao seu alcance</Page.Slogan>
                </Page.WrapperLogoAndText>
                <S.LoginForm>
                    <Input.Root>
                        <Input.Label>Usuário *</Input.Label>
                        <Input.Input/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>Senha *</Input.Label>
                        <Input.Input/>
                    </Input.Root>

                    <PrimaryButton>{"Entrar >"}</PrimaryButton>
                    <S.Link>Esqueceu a senha?</S.Link>
                </S.LoginForm>

                <S.RegisterArea>
                    <S.RegisterPhrase>Não possui uma conta? <S.Link>Cadastre-se</S.Link></S.RegisterPhrase>
                </S.RegisterArea>
            </Page.Content>
           


        </Page.Background>
    );
}