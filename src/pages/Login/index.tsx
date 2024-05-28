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
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [user, setUser] = useState({
        email: "",
        password: ""
        
    })


    const handleSubmit = async (e:any) => {
        
        
            
        
        if(user.email !== '' && user.password !== ''){
            /*try {
            console.log(`user ${apiKey}`)

            const response = await axiosInstance.post(
                '/users', 
                user,
                {
                    headers: {
                        'x-api-key': `${apiKey}`
                    }
                }
                
            )
            
        
            if (response.status === 201) {
                // Cadastro bem-sucedido
                console.log('Usuário cadastrado:', response.data);
                setErrorText('')
                setModalOpen(true)
                
            } else {
                // Tratar erros de requisição
                console.error('Erro ao cadastrar usuário:', response.statusText);
            }
            } catch (error) {
                // Tratar erros de rede
                console.error('Erro de rede:', error.response);
                setErrorText(error.response.data.message)
            }*/
            setPasswordError("")
            setEmailError("")
            console.log(user)
        }
        else if(user.email !== '' && user.password === ''){
            setPasswordError("Preencha o campo de senha")
            setEmailError("")
        }
        else if(user.email === '' && user.password !== ''){
            setEmailError("Preencha o campo de E-mail")
            setPasswordError("")
        }
        else{
            setPasswordError("Preencha o campo de senha")
            setEmailError("Preencha o campo de E-mail")
        }

        e.preventDefault()
        console.log(user)

        
    }

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
                        <Input.Label>E-mail *</Input.Label>
                        <Input.Input
                            type="email"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            hasError={emailError !== ''}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{emailError}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Senha *</Input.Label>
                        <Input.Input
                            type="password"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            hasError={passwordError !== ''}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{passwordError}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <PrimaryButton
                        onClick={handleSubmit}
                    >
                        {"Entrar >"}
                    </PrimaryButton>
                    <S.Link>Esqueceu a senha?</S.Link>
                </S.LoginForm>

                <S.RegisterArea>
                    <S.RegisterPhrase>Não possui uma conta? <S.Link>Cadastre-se</S.Link></S.RegisterPhrase>
                </S.RegisterArea>
            </Page.Content>
           


        </Page.Background>
    );
}