import InputField from '../../../../components/Input/InputField'
import { EditFormData, EditSchema } from '../../schema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as S from './styles'
import { GenericPage } from '../../../../components/GenericPage'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Padlock } from '../../assets/padlock'
import { useUserContext } from '../../../../contexts/UserContext'
import { Controller } from 'react-hook-form'
import Checkbox from '../../../../components/Checkbox'
import { useState } from 'react'

interface ChangePasswordProps {
  onOpenDialog: (data: EditFormData) => void
}

export function ChangePasswordForm({ onOpenDialog }: ChangePasswordProps) {
  const { isUserExists } = useUserContext()
  const [changePassword, setChangePassword] = useState({
    showPassword: false,
    showNewPassword: false,
    showConfirmPassword: false
  })


  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    onOpenDialog(data)
  }

  const { control, handleSubmit } = useForm<EditFormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  return (
    <S.Section>
      <S.SectionTitle>Senha</S.SectionTitle>
      <S.SectionDescription>
        Se quiser, você pode alterar sua senha
      </S.SectionDescription>
      <GenericPage.Divider />
      <S.FormChangePassword onSubmit={handleSubmit(onSubmit)}>
        <S.InputWrapper>
          <InputField
            label="Senha atual"
            name="password"
            control={control}
            description=""
            type={changePassword.showPassword ? "text" : "password"}
            required
            
            isLoading={!isUserExists}
          />
          <Controller
            name="seePassword"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                    field.onChange(e.target.checked)
                    setChangePassword({...changePassword, showPassword:e.target.checked});
                  }
                }
                label="Ver senha"
                data-testid="checkbox-password"
              />
            )}
          />

        </S.InputWrapper>
        

        <S.InputWrapper>
          <InputField
            label="Nova senha"
            name="newPassword"
            control={control}
            description=""
            type={changePassword.showNewPassword ? "text" : "password"}
            required
            
            isLoading={!isUserExists}
          />

          <Controller
            name="seeNewPassword"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                  
                    field.onChange(e.target.checked)
                    setChangePassword({...changePassword, showNewPassword: e.target.checked})

                  }
                }
                label="Ver senha"
                data-testid="checkbox-password"
              />
            )}
          />

        </S.InputWrapper>
        
        <S.InputWrapper>
          <InputField
            label="Confirmar senha"
            name="confirmNewPassword"
            control={control}
            description=""
            type={changePassword.showConfirmPassword ? "text" : "password"}
            required
            
            isLoading={!isUserExists}
          />

          <Controller
            name="seeConfirmPassword"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {

                    field.onChange(e.target.checked)
                    setChangePassword({...changePassword, showConfirmPassword: e.target.checked})
                  }
                  
                }
                label="Ver senha"
                data-testid="checkbox-password"
              />
            )}
          />

        </S.InputWrapper>
        

        <S.ButtonWrapper>
          <PrimaryButton type="submit">
            <Padlock />
            <p>Alterar</p>
          </PrimaryButton>
        </S.ButtonWrapper>
      </S.FormChangePassword>
    </S.Section>
  )
}
