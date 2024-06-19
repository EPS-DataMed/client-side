import { GenericPage } from '../../components/GenericPage'
import { PrimaryButton } from '../../components/PrimaryButton'
import * as S from './styles'
import { Pen } from '../../assets/icons/pen'
import { Logout } from '../../assets/icons/logout'
import InputField from '../../components/Input/InputField'
import { EditFormData, DeleteAccData, DeleteAccSchema } from './schema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../../components/Input'
import { Breadcrumb } from '../../components/Breadcrumb'
import { useBreadcrumbs } from './hooks/useBreadCrumbs'
import { Padlock } from './assets/padlock'
import { deleteAccount, editPassword, getUser } from './services'
import { useCallback, useEffect, useState } from 'react'
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
import { ErrorToast, SuccessToast } from '../../components/Toast'
import { ChangePasswordForm } from './components/ChangePasswordForm'
import useNavigation from '../../hooks/useNavigation'

export function EditUser(){
    
    const navigateTo = useNavigation()
    
    const [passwordData, setPasswordData] = useState({} as EditFormData)

    const [loadingPasswordData, setLoadingPasswordData] = useState(false)

    const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false)

    const handleOpenPasswordDialog = useCallback(() => {

        handleUpdateDialogControlled(true)
        setDialogSubmissionStep('change_password')

    }, [])

    

    const handleSavePasswordData = useCallback((data: EditFormData) => {

        setPasswordData(data)

    }, [])

        


    const handleSubmitChangePassword = useCallback(async () => {
        const { userId } = getUserId()
        
        setLoadingPasswordData(true)
        console.log("aqui")
        try {
            const response = await editPassword(userId, passwordData)
            
            if(response){
                SuccessToast('Senha atualizada com sucesso!')
            }
            

        } catch (error) {
            ErrorToast(
                'Verifique suas informações novamente! Ou tente novamente mais tarde.',
            )
        } finally {
            setLoadingPasswordData(false)
        }   
        

    }, [])

    const { handleUpdateDialogControlled, isDialogControlledOpen } = useDialogControlled()
    
    const [dialogSubmissionStep, setDialogSubmissionStep] = useState<DialogStep>('')

    const handleSubmitDeleteAccount = useCallback(async () => {

        setLoadingDeleteAccount(true)
        
        try {
          
    
            const { userId } = getUserId()
      
            const userResponse = await deleteAccount(userId)
      
            if(userResponse){
              SuccessToast('Conta apagada com sucesso !')
              navigateTo('/', { replace: true })
            }
      
            
      
            
        } catch (error) {
            ErrorToast('Erro ao apagar conta. Tente novamente mais tarde.')
            console.error('Erro ao apagar conta:', error)
        } finally {
            setLoadingDeleteAccount(false)
        }

    }, [])

    const { dialogItemToRender } = useDialogItemToRender({
        handleUpdateDialogControlled,
        dialogSubmissionStep,
        onSubmitChangePassword: handleSubmitChangePassword,
        onSubmitDeleteUser:handleSubmitDeleteAccount
    })

    

    const [user, setUser] = useState({
        content:{
            full_name: '',
            email: '',
            birth_date: '',
            biological_sex: '',
        }
    })

   
    function openDeleteAccountDialog(){
        handleUpdateDialogControlled(true)
        setDialogSubmissionStep('delete_account')

    }

    const onSubmit: SubmitHandler<DeleteAccData> = async () => {
        
        openDeleteAccountDialog()
        
    }
    
    
    const BREADCRUMBS = useBreadcrumbs()
    

    const { control:controlDel, handleSubmit: handleSubmitDel} = useForm<DeleteAccData>({
        resolver: zodResolver(DeleteAccSchema),
        defaultValues: {
            currentPassword: '',
            confirmPassword: ''

        },
    })


    useEffect(() =>{
        const fetchData = async () =>{
            const { userId } = getUserId()
            const userData = await getUser(userId)
            setUser(userData)
        }

        fetchData()
    }, [])

    

    

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
                    onClose={handleCloseDialog}
                    isLoadingRequisition={loadingPasswordData || loadingDeleteAccount}
                />
            )}
            <GenericPage.Root>
                <S.Header>
                    <S.WrapperLogoAndLogoTitle>
                        <GenericPage.Logo />
                        <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
                    </S.WrapperLogoAndLogoTitle>

                    <GenericPage.HeaderOptions>
                        <GenericPage.ProfileButton letter="D" />
                       

                        <PrimaryButton>
                            <Pen />
                            <p>Paciente</p>
                        </PrimaryButton>

                        <PrimaryButton variant="red">
                            <Logout />
                            <p>Sair</p>
                        </PrimaryButton>

                    </GenericPage.HeaderOptions>
                    
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
                                    disabled={true}
                                    readOnly
                                    value={user.content.full_name}
                                />
                                
                            </Input.Root>


                            <Input.Root>
                                <Input.Label>E-mail *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    value={user.content.email}
                                    disabled={true}
                                />
                                
                            </Input.Root>

                            <Input.Root>
                                <Input.Label>Sexo biológico *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    disabled={true}
                                    value={user.content.biological_sex === 'M' ? 'Masculino' : 'Feminino'}
                                />
                                
                            </Input.Root>
                            
                            <Input.Root>
                                <Input.Label>Data de nascimento *</Input.Label>
                                <Input.Input
                                    cursor="not-allowed"
                                    readOnly
                                    disabled={true}
                                    value={getFormattedDate(user.content.birth_date)}
                                />
                                
                            </Input.Root>

                        </S.UserDataInputs>
                    </S.Section>

                    <ChangePasswordForm
                        onOpenDialog={handleOpenPasswordDialog}
                        onSavePasswordData={handleSavePasswordData}
                    />

                    <S.DeleteSection>
                        <S.SectionTitle>Apagar conta</S.SectionTitle>
                        <S.SectionDescription>Se quiser, você pode apagar sua conta, você perderá todas as suas informações.</S.SectionDescription>
                        <GenericPage.Divider/>
                        <S.DeleAccForm 
                            onSubmit={handleSubmitDel(onSubmit)}
                        >
                            <InputField
                                label="Senha atual"
                                name="currentPassword"
                                control={controlDel}
                                description=""
                                type="password"
                                required
                            />
                            
                            
                            <InputField
                                label="Confirmar senha"
                                name="confirmPassword"
                                control={controlDel}
                                description=""
                                type="password"
                                required
                            />

                            <S.ButtonWrapper>
                                <PrimaryButton 
                                    variant="red"
                                    type="submit"
                                >
                                    <Padlock />
                                    <p>Apagar</p>
                                </PrimaryButton>
                            </S.ButtonWrapper>

                        </S.DeleAccForm>
                    </S.DeleteSection>
                </S.MainContent>

                <GenericPage.Divider />

            </GenericPage.Root>
        
        
        </>



    )
}