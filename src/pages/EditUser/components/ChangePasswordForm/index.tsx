import InputField from '../../../../components/Input/InputField'
import { EditFormData, EditSchema } from '../../schema'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as S from './styles'
import { GenericPage } from '../../../../components/GenericPage'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Padlock } from '../../assets/padlock'
import { useUserContext } from '../../../../contexts/UserContext'

interface ChangePasswordProps {
  onOpenDialog: (data: EditFormData) => void
}

export function ChangePasswordForm({ onOpenDialog }: ChangePasswordProps) {
  const { isUserExists } = useUserContext()

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
        <InputField
          label="Senha atual"
          name="password"
          control={control}
          description=""
          type="password"
          required
          width="225px"
          isLoading={!isUserExists}
        />
        <InputField
          label="Nova senha"
          name="newPassword"
          control={control}
          description=""
          type="password"
          required
          width="225px"
          isLoading={!isUserExists}
        />

        <InputField
          label="Confirmar senha"
          name="confirmNewPassword"
          control={control}
          description=""
          type="password"
          required
          width="225px"
          isLoading={!isUserExists}
        />

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
