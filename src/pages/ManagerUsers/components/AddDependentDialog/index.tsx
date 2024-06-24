import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import * as S from './styles'
import useNavigation from '../../../../hooks/useNavigation'
import InputField from '../../../../components/Input/InputField'
import { useUserContext } from '../../../../contexts/UserContext'
import { Spinner } from '../../../../components/Spinner'
import { useSubmitDependent } from './hooks/useSubmitDependent'

const schema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
})

export type FormAddDependentData = z.infer<typeof schema>

export function AddDependentDialog({
  onCloseDialog,
}: {
  onCloseDialog: () => void
}) {
  const { control, handleSubmit } = useForm<FormAddDependentData>({
    resolver: zodResolver(schema),
  })

  const { isDoctor } = useUserContext()

  const { loading, onSubmit } = useSubmitDependent()

  const navigateTo = useNavigation()

  return (
    <S.Container
      data-testid="add-dependent-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="E-mail"
        name="email"
        control={control}
        width="225px"
        description="Informe o seu e-mail pessoal."
        required
      />

      <S.MessageArea data-testid="message-area">
        <S.MessagePhrase>
          Um e-mail será enviado para o endereço acima. Seu{' '}
          {isDoctor ? 'paciente' : 'dependente'} <b>deve estar cadastrado</b> na
          plataforma. Se não estiver, cadastre-o{' '}
          <S.Link
            onClick={() => {
              navigateTo('/signup')
            }}
            data-testid="signup-link"
          >
            aqui
          </S.Link>
        </S.MessagePhrase>
      </S.MessageArea>
      <S.WrapperButtons>
        <PrimaryButton
          onClick={onCloseDialog}
          variant="secondary"
          type="button"
          data-testid="back-button"
        >
          Voltar
        </PrimaryButton>
        <PrimaryButton type="submit" data-testid="submit-button">
          {loading ? (
            <>
              Carregando <Spinner data-testid="spinner" />
            </>
          ) : (
            'Adicionar'
          )}
        </PrimaryButton>
      </S.WrapperButtons>
    </S.Container>
  )
}
