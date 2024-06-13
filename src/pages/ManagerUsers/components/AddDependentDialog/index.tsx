import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import InputField from '../../../UserForm/components/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import * as S from './styles'
import useNavigation from '../../../../hooks/useNavigation'

const schema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
})

type FormData = z.infer<typeof schema>

export function AddDependentDialog() {
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const navigateTo = useNavigation()

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="E-mail"
        name="email"
        control={control}
        description="Informe o seu e-mail pessoal."
        required
      />

      <S.MessageArea>
        <S.MessagePhrase>
          Um e-mail será enviado para o endereço acima. Seu dependente{' '}
          <b>deve estar cadastrado</b> na plataforma. Se não estiver, cadastre-o{' '}
          <S.Link
            onClick={() => {
              navigateTo('/signup')
            }}
          >
            aqui
          </S.Link>
        </S.MessagePhrase>
      </S.MessageArea>
      <S.WrapperButtons>
        <PrimaryButton variant="secondary" type="button">
          Voltar
        </PrimaryButton>
        <PrimaryButton type="submit">Adicionar</PrimaryButton>
      </S.WrapperButtons>
    </S.Container>
  )
}