import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { GenericPage } from '../../components/GenericPage'
import { Input } from '../../components/Input'
import * as S from './styles'
import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'

export function Signup() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        dateOfBirth: ""
        
    })

    const [confirmPassword, setConfirmPassword] = useState({
        value: '',
        isValid: true,
        errorMessage: ''
    })

    const [name, setName] = useState({
        isValid: true,
        errorMessage: ''
    })

    const [email, setEmail] = useState({
        isValid: true,
        errorMessage: ''
    })

    const [dateOfBirth, setDateOfBirth] = useState({
        isValid: true,
        errorMessage: ''
    })

    const [password, setPassword] = useState({
        isValid: true,
        errorMessage: ''
    })


    function validateUserData(e:any){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!user.email){
            
            e.preventDefault()
            setEmail({...email , isValid: false ,errorMessage: "E-mail é obrigatório"})
        }
        else if(!regex.test(user.email)){
            
            setEmail({...email , isValid: false, errorMessage: "E-mail em formato inválido"})
            e.preventDefault()
    
        }
        else{
            
            setEmail({...email , isValid: true, errorMessage: ""})
            e.preventDefault()
        }

        if(!user.name){
            
            setName({...email, isValid: false , errorMessage: "Nome é obrigatório"})
            e.preventDefault()
        }
        else{
            
            setName({...email, isValid: true , errorMessage: ""})
            e.preventDefault()
        }

        if(!user.dateOfBirth){
            
            setDateOfBirth({...dateOfBirth, isValid: false , errorMessage: "Data de nascimento é obrigatória"})
            e.preventDefault()
        }
        else{
            
            setDateOfBirth({...dateOfBirth, isValid: true , errorMessage: ""})
            e.preventDefault()
        }

        if(!user.password){
            
            setPassword({...password, isValid: false, errorMessage: "Senha é obrigatória"})
            e.preventDefault()
        }
        else{
            
            setPassword({...password, isValid: true, errorMessage: ""})
            e.preventDefault()
        }


        if(!confirmPassword.value){
            
            setConfirmPassword({ ...confirmPassword , isValid: false, errorMessage: "Este campo é obrigatório"})
            e.preventDefault()
 
        }
        else{
            
            setConfirmPassword({ ...confirmPassword , isValid: true, errorMessage: ""})
            e.preventDefault()
        }
        if(user.password !== confirmPassword.value){
            console.log(`Senha são diferentes ${user.password} | ${confirmPassword}`)
            setPassword({...password, isValid: false, errorMessage: "As senhas estão diferentes"})
            setConfirmPassword({...confirmPassword, isValid: false, errorMessage: "As senhas estão diferentes"})
            e.preventDefault()
            
        }
        
        
        
    }
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        await validateUserData(e)
        
            
        
        if(name.isValid && email.isValid && dateOfBirth.isValid && password.isValid && confirmPassword.isValid){
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
            console.log(user)
        }
        
        

        
    }

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
                        <Input.Input 
                            type="text"
                            hasError={!name.isValid}
                            onChange={(e) => setUser({...user, name: e.target.value})}
                        />
                    </Input.Root>


                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{name.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>
                    

                    <Input.Root>
                        <Input.Label>E-mail *</Input.Label>
                        <Input.Description>Informe o seu e-mail pessoal.</Input.Description>
                        <Input.Input 
                            type="email"
                            onChange={(e) => setUser({...user, email: e.target.value})}
                            hasError={!email.isValid}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{email.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Data de Nascimento *</Input.Label>
                        <Input.Description>Informe sua data de nascimento.</Input.Description>
                        <Input.Input 
                            type="date"
                            onChange={(e) => setUser({...user, dateOfBirth: e.target.value})}
                            hasError={!dateOfBirth.isValid}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{dateOfBirth.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Senha *</Input.Label>
                        <Input.Description>Escolha uma senha, deve conter <b>letras</b> e <b>números</b>.</Input.Description>
                        <Input.Input 
                            type="password"
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            hasError={!password.isValid}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{password.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Confirme sua senha *</Input.Label>
                        <Input.Description>Confirme sua senha definida no campo acima.</Input.Description>
                        <Input.Input 
                            type="password"
                            onChange={(e) => setConfirmPassword({...confirmPassword, value: e.target.value})}    
                            hasError={!confirmPassword.isValid}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{confirmPassword.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>
                    
                    
                </S.SignupForm>

                <S.ForwardButtonWrapper>
                    <PrimaryButton 
                        onClick={handleSubmit}
                    >
                        {"Avançar >"}
                    </PrimaryButton>
                </S.ForwardButtonWrapper>
                
               
            </Page.Content>

            <Page.Image>
                <LoginImage/>
            </Page.Image>
           


        </Page.Background>
    );
}