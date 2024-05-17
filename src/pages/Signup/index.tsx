import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { GenericPage } from '../../components/GenericPage'
import { Input } from '../../components/Input'
import * as S from './styles'
import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'

export function Signup() {


    return (

        <Page.Background>
            
            
            <Page.Content>
                <Page.WrapperLogoAndText>
                    <LogoSVG/>
                    <Page.LogoTitle>Datamed</Page.LogoTitle>
                    <Page.Slogan>Tenha seus dados de saúde ao seu alcance</Page.Slogan>
                </Page.WrapperLogoAndText>
                
                <S.SignupProgress>
                    <S.BlueProgressCircle/>
                    <S.GreyProgressCircle/>
                </S.SignupProgress>

                <S.SignupInstruction>Preencha suas <b>informações básicas</b> e avance para a proxima etapa.</S.SignupInstruction>
                
               
                
                <S.SignupForm>
                    <Input.Root>
                        <Input.Label>Nome Completo *</Input.Label>
                        <Input.Description>Informe o seu nome completo, sem abreviações.</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>E-mail *</Input.Label>
                        <Input.Description>Informe o seu e-mail pessoal.</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>Data de Nascimento *</Input.Label>
                        <Input.Description>Informe sua data de nascimento.</Input.Description>
                        <Input.Input type="date"/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>Senha *</Input.Label>
                        <Input.Description>Escolha uma senha, deve conter <b>letras</b> e <b>números</b>.</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>Confirme sua senha *</Input.Label>
                        <Input.Description>Confirme sua senha definida no campo acima.</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    
                    
                </S.SignupForm>

                <S.ForwardButtonWrapper>
                    <PrimaryButton>{"Avançar >"}</PrimaryButton>
                </S.ForwardButtonWrapper>
                
               
            </Page.Content>

            <Page.Image>
                <LoginImage/>
            </Page.Image>
           


        </Page.Background>
    );
}