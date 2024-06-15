import { GenericPage } from '../../components/GenericPage'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ButtonsAndProfile } from '../../components/ButtonsAndProfile'
import { ProfileCircle } from '../../components/ProfileCircle'
import * as S from './styles'
import { Pen } from '../../assets/icons/pen'
import { Logout } from '../../assets/icons/logout'
import InputField from '../../components/Input/InputField'
import { EditFormData, EditSchema, DeleteAccData, DeleteAccSchema } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/Input'
import { Breadcrumb } from '../../components/Breadcrumb'
import { useBreadcrumbs } from './hooks/useBreadCrumbs'
import { Padlock } from './assets/padlock'
import { getUser } from './services'
import { useEffect, useState } from 'react'
import { useDialogItemToRender } from './hooks/dialogItemToRender'
import {
    DialogControlled,
    useDialogControlled,
} from '../../components/DialogControlled'
import {
    isNotUndefined,
} from '../../interfaces/typeGuards'

import { DialogStep } from './interfaces/dialogStep'
import { getUserId } from '../../utils/getUserId'
import { useEditUserForm } from './hooks/useEditUserForm'
import { useDeleteAccForm } from './hooks/useDeleteAccForm'
export function EditUser(){

    const {
        
        
        loading,
        onSubmit,
        
    } = useEditUserForm()

    const {
        
        
        loading: loadingDel,
        onSubmit: onSubmitDel,
        
    } = useDeleteAccForm()

    const [user, setUser] = useState({
        content:{
            nome_completo: '',
            email: '',
            data_nascimento: '',
            sexo_biologico: '',
        }
    })

    const { handleUpdateDialogControlled, isDialogControlledOpen } = useDialogControlled()
    
    const [dialogSubmissionStep, setDialogSubmissionStep] = useState<DialogStep>('')
    

    const { dialogItemToRender } = useDialogItemToRender({
        handleUpdateDialogControlled,
        dialogSubmissionStep,
    })
    const BREADCRUMBS = useBreadcrumbs()
    const { control, handleSubmit  } = useForm<EditFormData>({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: ''

        },
    })

    const { control:controlDel, handleSubmit: handleSubmitDel} = useForm<DeleteAccData>({
        resolver: zodResolver(DeleteAccSchema),
        defaultValues: {
            password: '',
            confirmNewPassword: ''

        },
    })


    useEffect(() =>{
        const fetchData = async () =>{
            const { userId } = getUserId()
            const userData = await getUser(userId)
            console.log("user", userData)
            setUser(userData)
        }

        fetchData()
    }, [])

    function openChangePassword() {
        handleUpdateDialogControlled(true)
        setDialogSubmissionStep('change_password')
        
    }

    function openDeleteAccount(){
        handleUpdateDialogControlled(true)
        setDialogSubmissionStep('delete_account')

    }

    function handleCloseDialog() {
        setDialogSubmissionStep('')
        //setOptionToDelete({} as OptionProps)
    }

    function getFormattedDate(date: string){
        let split_date = date.split('-')
        return `${split_date[2]}/${split_date[1]}/${split_date[0]}`
    }
    return (
        <>
            {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
                <DialogControlled
                    isDialogControlledOpen={isDialogControlledOpen}
                    handleUpdateDialogControlled={handleUpdateDialogControlled}
                    dialogItemToRender={dialogItemToRender}
                    isLoadingRequisition={false}
                    onClose={handleCloseDialog}
                    
                />
            )}
            <GenericPage.Root>
                <S.Header>
                    <S.WrapperLogoAndLogoTitle>
                        <GenericPage.Logo />
                        <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
                    </S.WrapperLogoAndLogoTitle>

                    <ButtonsAndProfile>
                        <ProfileCircle>
                            <p>D</p>
                        </ProfileCircle>

                        <PrimaryButton>
                            <Pen />
                            <p>Paciente</p>
                        </PrimaryButton>

                        <PrimaryButton variant="red">
                            <Logout />
                            <p>Sair</p>
                        </PrimaryButton>

                    </ButtonsAndProfile>
                    
                </S.Header>

                <S.BreadcrumbWrapper>
                    <Breadcrumb items={BREADCRUMBS} />
                </S.BreadcrumbWrapper>
                
                <GenericPage.Divider />

                <S.MainContent>
                    <S.Section>
                        <S.SectionTitle>Informações Pessoais</S.SectionTitle>
                        <S.SectionDescription>Visualize suas informações pessoais</S.SectionDescription>
                        <GenericPage.Divider/>
                        <S.UserDataInputs>
                            <Input.Root>
                                <Input.Label>Nome *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    edit={false}
                                    readOnly
                                    value={user.content.nome_completo}
                                />
                                
                            </Input.Root>


                            <Input.Root>
                                <Input.Label>E-mail *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    value={user.content.email}
                                />
                                
                            </Input.Root>

                            <Input.Root>
                                <Input.Label>Sexo biológico *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    value={user.content.sexo_biologico === 'M' ? 'Masculino' : 'Feminino'}
                                />
                                
                            </Input.Root>
                            
                            <Input.Root>
                                <Input.Label>Data de nascimento *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    value={getFormattedDate(user.content.data_nascimento)}
                                />
                                
                            </Input.Root>

                        </S.UserDataInputs>
                    </S.Section>

                    <S.Section>
                        <S.SectionTitle>Senha</S.SectionTitle>
                        <S.SectionDescription>Se quiser, você pode alterar sua senha</S.SectionDescription>
                        <GenericPage.Divider/>
                        <S.UserDataInputs>
                            <InputField
                                label="Senha atual"
                                name="password"
                                control={control}
                                description=""
                                type="password"
                                required
                            />
                            <InputField
                                label="Nova senha"
                                name="newPassword"
                                control={control}
                                description=""
                                type="password"
                                required
                            />
                            
                            <InputField
                                label="Confirmar senha"
                                name="confirmNewPassword"
                                control={control}
                                description=""
                                type="password"
                                required
                            />
                            
                            <S.ButtonWrapper>
                                <PrimaryButton
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    <Padlock />
                                    <p>Alterar</p>
                                </PrimaryButton>
                            </S.ButtonWrapper>
                            
                            
                            

                        </S.UserDataInputs>
                    </S.Section>

                    <S.DeleteSection>
                        <S.SectionTitle>Apagar conta</S.SectionTitle>
                        <S.SectionDescription>Se quiser, você pode apagar sua conta, você perderá todas as suas informações.</S.SectionDescription>
                        <GenericPage.Divider/>
                        <S.UserDataInputs>
                            <InputField
                                label="Senha atual"
                                name="password"
                                control={controlDel}
                                description=""
                                type="password"
                                required
                            />
                            
                            
                            <InputField
                                label="Confirmar senha"
                                name="confirmNewPassword"
                                control={controlDel}
                                description=""
                                type="password"
                                required
                            />

                            <S.ButtonWrapper>
                                <PrimaryButton 
                                    variant="red"
                                    onClick={handleSubmitDel(onSubmitDel)}
                                >
                                    <Padlock />
                                    <p>Apagar</p>
                                </PrimaryButton>
                            </S.ButtonWrapper>

                        </S.UserDataInputs>
                    </S.DeleteSection>
                </S.MainContent>

                <GenericPage.Divider />

            </GenericPage.Root>
        
        
        </>



    )
}