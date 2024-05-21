import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { GenericPage } from '../../components/GenericPage'
import { Input } from '../../components/Input'
import * as S from './styles'
import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'

export function SignupDoctor() {


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
                    <S.BlueProgressCircle/>
                </S.SignupProgress>

                <S.SignupInstruction>Se você for <b>médico</b>, preencha as informações abaixo, se não apenas continue o cadastro</S.SignupInstruction>
                
               
                
                <S.SignupForm>
                    <Input.Root>
                        <Input.Label>CRM *</Input.Label>
                        <Input.Description>Informe o seu ESTADO/CRM.</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    <Input.Root>
                        <Input.Label>Especialidade *</Input.Label>
                        <Input.Description>Informe sua especialidade</Input.Description>
                        <Input.Input/>
                    </Input.Root>

                    
                    
                    
                </S.SignupForm>

                <S.FinishButtonWrapper>
                    <PrimaryButton>{"< Voltar"}</PrimaryButton>
                    <PrimaryButton>{"Pular e Concluir >"}</PrimaryButton>
                </S.FinishButtonWrapper>
                
               
            </Page.Content>

            <Page.Image>
                <LoginImage/>
            </Page.Image>
           


        </Page.Background>
    );
}