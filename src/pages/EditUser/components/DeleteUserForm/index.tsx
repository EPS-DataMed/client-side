import { Controller, useForm } from 'react-hook-form'
import { GenericPage } from '../../../../components/GenericPage'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Padlock } from '../../assets/padlock'
import { DeleteAccData, DeleteAccSchema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as S from './styles'
import { useUserContext } from '../../../../contexts/UserContext'
import { useState } from 'react'
import Checkbox from '../../../../components/Checkbox'

interface DeleteUserFormProps {
  onOpenDialog: () => void
}

export function DeleteUserForm({ onOpenDialog }: DeleteUserFormProps) {
  const { isUserExists } = useUserContext()
  const [deleteAccount, setDeleteAccount] = useState({
    showPassword: false,
    showConfirmPassword: false
  })
  const { control: controlDel, handleSubmit: handleSubmitDel } =
    useForm<DeleteAccData>({
      resolver: zodResolver(DeleteAccSchema),
      defaultValues: {
        currentPassword: '',
        confirmPassword: '',
      },
    })

  return (
    <S.DeleteSection>
      <S.SectionTitle>Apagar conta</S.SectionTitle>
      <S.SectionDescription>
        Se quiser, você pode apagar sua conta, você perderá todas as suas
        informações.
      </S.SectionDescription>
      <GenericPage.Divider />
      <S.DeleAccForm onSubmit={handleSubmitDel(onOpenDialog)}>
        <S.InputWrapper>
          <InputField
            label="Senha atual"
            name="currentPassword"
            control={controlDel}
            description=""
            type={deleteAccount.showPassword ? "text": "password"}
            required
            width="225px"
            isLoading={!isUserExists}
          />

          <Controller
            name="seePassword"
            control={controlDel}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                    field.onChange(e.target.checked)
                    setDeleteAccount({...deleteAccount, showPassword:e.target.checked});
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
            name="confirmPassword"
            control={controlDel}
            description=""
            type={deleteAccount.showConfirmPassword ? "text" : "password"}
            required
            width="225px"
            isLoading={!isUserExists}
          />

          <Controller
            name="seeConfirmPassword"
            control={controlDel}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => {
                    field.onChange(e.target.checked)
                    setDeleteAccount({...deleteAccount, showConfirmPassword:e.target.checked});
                  }
                }
                label="Ver senha"
                data-testid="checkbox-confirm-password"
              />
            )}
          />
        </S.InputWrapper>
        

        <S.ButtonWrapper>
          <PrimaryButton variant="red" type="submit">
            <Padlock />
            <p>Apagar</p>
          </PrimaryButton>
        </S.ButtonWrapper>
      </S.DeleAccForm>
    </S.DeleteSection>
  )
}
