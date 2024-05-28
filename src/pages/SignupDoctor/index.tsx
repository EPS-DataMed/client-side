import { useMemo, useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { GenericPage } from '../../components/GenericPage'
import { Input } from '../../components/Input'
import * as S from './styles'
import { useNavigate, useLocation } from 'react-router-dom';

import { LoginImage } from '../../assets/loginImage'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'

export function SignupDoctor() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user: userFromNavigation } = location.state || { user: {} };
    const [user, setUser] = useState({
        name: userFromNavigation !== undefined ? userFromNavigation.name : "",
        email: userFromNavigation !== undefined ? userFromNavigation.email : "",
        password: userFromNavigation !== undefined ? userFromNavigation.password : "",
        dateOfBirth: userFromNavigation !== undefined ? userFromNavigation.dateOfBirth : "",
        
    })
    const medicalSpecialties = [
        'Alergia e Imunologia',
        'Anestesiologia',
        'Angiologia',
        'Cancerologia (Oncologia)',
        'Cardiologia',
        'Cirurgia Cardiovascular',
        'Cirurgia da Mão',
        'Cirurgia de Cabeça e Pescoço',
        'Cirurgia do Aparelho Digestivo',
        'Cirurgia Geral',
        'Cirurgia Pediátrica',
        'Cirurgia Plástica',
        'Cirurgia Torácica',
        'Cirurgia Vascular',
        'Clínica Médica (Medicina Interna)',
        'Coloproctologia',
        'Dermatologia',
        'Endocrinologia e Metabologia',
        'Endoscopia',
        'Gastroenterologia',
        'Genética Médica',
        'Geriatria',
        'Ginecologia e Obstetrícia',
        'Hematologia e Hemoterapia',
        'Homeopatia',
        'Infectologia',
        'Mastologia',
        'Medicina de Família e Comunidade',
        'Medicina de Tráfego',
        'Medicina do Trabalho',
        'Medicina Esportiva',
        'Medicina Física e Reabilitação',
        'Medicina Intensiva',
        'Medicina Legal e Perícia Médica',
        'Medicina Nuclear',
        'Medicina Preventiva e Social',
        'Nefrologia',
        'Neurocirurgia',
        'Neurologia',
        'Nutrologia',
        'Oftalmologia',
        'Ortopedia e Traumatologia',
        'Otorrinolaringologia',
        'Patologia',
        'Patologia Clínica / Medicina Laboratorial',
        'Pediatria',
        'Pneumologia',
        'Psiquiatria',
        'Radiologia e Diagnóstico por Imagem',
        'Radioterapia',
        'Reumatologia',
        'Urologia',
        'Acupuntura',
        'Medicina Paliativa',
        'Medicina do Adolescente'
    ];

    const [crmInput, setCrmInput] = useState({
        isValid: true,
        errorMessage: ''
    })

    const [specialtyInput, setSpecialtyInput] = useState({
        isValid: true,
        errorMessage: ''
    })

    const [doctor, setDoctor] = useState({
        crm: "",
        specialty: ""
        
    })

    function validateDoctorData(e:any){
        
        if(!doctor.crm && doctor.specialty !== ''){
            
            
            setCrmInput({...crmInput , isValid: false ,errorMessage: "Preencha o CRM"})
            e.preventDefault()
        }
        else if(doctor.crm !== '' && !doctor.specialty){
            setSpecialtyInput({...specialtyInput , isValid: false, errorMessage: "Escolha a especialidade"})
            e.preventDefault()
        }
        
        else{
            
            setCrmInput({...crmInput , isValid: true ,errorMessage: ""})
            setSpecialtyInput({...specialtyInput, isValid: true, errorMessage: ""})
            e.preventDefault()
        }

        
        
        
        
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        await validateDoctorData(e)
        
        
        
        if(crmInput.isValid && specialtyInput.isValid){
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
            console.log(doctor)
        }
        
        

        
    }

    function returnToSignup(){
        navigate('/signup', { state: { user } });
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
                    <S.BlueProgressCircle/>
                </S.SignupProgress>

                <S.SignupInstruction>Se você for <b>médico</b>, preencha as informações abaixo, se não apenas continue o cadastro</S.SignupInstruction>
                
               
                
                <S.SignupForm>
                    <Input.Root>
                        <Input.Label>CRM *</Input.Label>
                        <Input.Description>Informe o seu ESTADO/CRM.</Input.Description>
                        <Input.Input 
                            onChange={(e)=> setDoctor({...doctor, crm: e.target.value})}
                            hasError={!crmInput.isValid}
                        />
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{crmInput.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    <Input.Root>
                        <Input.Label>Especialidade *</Input.Label>
                        <Input.Description>Informe sua especialidade</Input.Description>
                        <S.SpecialtyInput 
                            hasError={!specialtyInput.isValid} 
                            onChange={(e) => setDoctor({...doctor, specialty: e.target.value})}
                        >
                            <option>{''}</option>
                            {medicalSpecialties.map((specialty, index) => (
                                <option key={index} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </S.SpecialtyInput>
                    </Input.Root>

                    <Input.ErrorMessageRoot>
                        <Input.ErrorMessage>{specialtyInput.errorMessage}</Input.ErrorMessage>
                    </Input.ErrorMessageRoot>

                    
                    
                    
                </S.SignupForm>

                <S.FinishButtonWrapper>
                    <PrimaryButton
                        variant="secondary"
                        onClick={returnToSignup}
                    >
                        {"< Voltar"}
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={handleSubmit}
                    >
                        {`${doctor.crm === '' || doctor.specialty === '' ? 'Pular e ' : ''}Concluir` }
                    </PrimaryButton>
                </S.FinishButtonWrapper>
                
               
            </Page.Content>

            <Page.Image>
                <LoginImage/>
            </Page.Image>
           


        </Page.Background>
    );
}