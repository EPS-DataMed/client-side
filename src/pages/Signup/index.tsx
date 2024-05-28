import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '../../components/Input'
import * as S from './styles'
import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'

export function Signup() {
    const location = useLocation();
    const { user: userFromNavigation } = location.state || { user: {} };
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: userFromNavigation !== undefined ? userFromNavigation.name : "",
        email: userFromNavigation !== undefined ? userFromNavigation.email : "",
        password: userFromNavigation !== undefined ? userFromNavigation.password : "",
        dateOfBirth: userFromNavigation !== undefined ? userFromNavigation.dateOfBirth : "",
        
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

    function isPasswordValid(password: string) {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const length = password.length >= 8
        
        return hasLetter && hasNumber && length;
    }

    function validateUserData(e:any){
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!user.email){
            
            
            setEmail({...email , isValid: false ,errorMessage: "E-mail é obrigatório"})
            e.preventDefault()
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
        else if(!isPasswordValid(user.password)){
            setPassword({...password, isValid: false, errorMessage: "Deve conter no mínimo 8 caracteres, com letras e números"})
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
        else if(!isPasswordValid(confirmPassword.value)){
            setConfirmPassword({...confirmPassword, isValid: false, errorMessage: "Deve conter no mínimo 8 caracteres, com letras e números"})
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
        console.log("usernavigation: " ,userFromNavigation)
        await validateUserData(e)
        
            
        
        if(name.isValid && email.isValid && dateOfBirth.isValid && password.isValid && confirmPassword.isValid){

            navigate('/signupdoctor', { state: { user } });
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
                            value={user.name}
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
                            value={user.email}
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
                            value={user.dateOfBirth}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{dateOfBirth.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Senha *</Input.Label>
                        <Input.Description>Deve conter pelo menos <b>oito caracteres</b>, com <b>letras</b> e <b>números</b>.</Input.Description>
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