import { useForm } from 'react-hook-form'
import { GenericPage } from '../../../../components/GenericPage'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { Padlock } from '../../assets/padlock'
import { DeleteAccData, DeleteAccSchema } from '../../schema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as S from './styles'
import { useUserContext } from '../../../../contexts/UserContext'

interface DeleteUserFormProps {
  onOpenDialog: () => void
}

export function DeleteUserForm({ onOpenDialog }: DeleteUserFormProps) {
  const { isUserExists } = useUserContext()

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
        <InputField
          label="Senha atual"
          name="currentPassword"
          control={controlDel}
          description=""
          type="password"
          required
          width="225px"
          isLoading={!isUserExists}
        />

        <InputField
          label="Confirmar senha"
          name="confirmPassword"
          control={controlDel}
          description=""
          type="password"
          required
          width="225px"
          isLoading={!isUserExists}
        />

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
