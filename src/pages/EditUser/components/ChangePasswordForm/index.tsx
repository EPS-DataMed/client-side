
import InputField from '../../../../components/Input/InputField'
import { EditFormData, EditSchema } from '../../schema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as S from './styles'
import { GenericPage } from '../../../../components/GenericPage'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Padlock } from '../../assets/padlock'


interface ChangePasswordProps{
    onOpenDialog: ()=> void,
    onSavePasswordData: (data: EditFormData) => void
}

export function ChangePasswordForm({onOpenDialog, onSavePasswordData}:ChangePasswordProps){

    
    
    const onSubmit: SubmitHandler<EditFormData> = async (data) => {
        
        // handleUpdateDialogControlled(true)
        // setDialogSubmissionStep('change_password')
        onOpenDialog()
        onSavePasswordData(data)

    }

    const { control, handleSubmit  } = useForm<EditFormData>({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: ''

        },
    })


    return(
        <S.Section>
            <S.SectionTitle>Senha</S.SectionTitle>
            <S.SectionDescription>Se quiser, você pode alterar sua senha</S.SectionDescription>
            <GenericPage.Divider/>
            <S.FormChangePassword onSubmit={handleSubmit(onSubmit)}>
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
                        
                        type="submit"
                    >
                        <Padlock />
                        <p>Alterar</p>
                    </PrimaryButton>
                </S.ButtonWrapper>
                
                
                

            </S.FormChangePassword>
        </S.Section>
    )
}