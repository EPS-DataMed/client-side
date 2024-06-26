import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
  onOpenDialog: (data: DeleteAccData) => void
}

export function DeleteUserForm({ onOpenDialog }: DeleteUserFormProps) {
  const { isUserExists } = useUserContext()
  const [deleteAccount, setDeleteAccount] = useState({
    showPassword: false,
    showConfirmPassword: false,
  })

  const onSubmit: SubmitHandler<DeleteAccData> = async (data) => {
    onOpenDialog(data)
  }
  const { control: controlDel, handleSubmit: handleSubmitDel } =
    useForm<DeleteAccData>({
      resolver: zodResolver(DeleteAccSchema),
      defaultValues: {
        currentPassword: '',
        confirmPassword: '',
        seePassword: false,
        seeConfirmPassword: false,
      },
    })

  return (
    <S.DeleteSection>
      <S.SectionTitle>Apagar conta</S.SectionTitle>
      <S.SectionDescription>
        Para apagar sua conta, siga as etapas abaixo: insira sua senha atual no
        campo correspondente e confirme sua decisão de excluir a conta. Tenha em
        mente que esta ação é irreversível.
      </S.SectionDescription>
      <GenericPage.Divider />
      <S.DeleAccForm onSubmit={handleSubmitDel(onSubmit)}>
        <S.InputWrapper>
          <InputField
            label="Senha atual"
            name="currentPassword"
            control={controlDel}
            description=""
            type={deleteAccount.showPassword ? 'text' : 'password'}
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
                  setDeleteAccount({
                    ...deleteAccount,
                    showPassword: e.target.checked,
                  })
                }}
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
            type={deleteAccount.showConfirmPassword ? 'text' : 'password'}
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
                  setDeleteAccount({
                    ...deleteAccount,
                    showConfirmPassword: e.target.checked,
                  })
                }}
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
