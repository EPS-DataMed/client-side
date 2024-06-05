import { ArrowLeft, ArrowRight } from '../../../../assets/icons'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { StepProps } from '../../interfaces'
import * as S from '../../styles'

export function Step2({ control, setStep }: StepProps) {
  return (
    <>
      <S.SignupInstruction>
        Por favor, preencha sua <b>senha</b> para acessar a plataforma e
        aproveitar todos os recursos disponíveis.
      </S.SignupInstruction>
      <S.SignupFieldsForm>
        <InputField
          label="Senha"
          name="password"
          type="password"
          control={control}
          description="Deve conter pelo menos oito caracteres, com letras e números."
          required
        />

        <InputField
          label="Confirme sua senha"
          name="confirmPassword"
          control={control}
          type="password"
          description="Confirme sua senha definida no campo acima."
          required
        />
      </S.SignupFieldsForm>

      <S.ForwardButtonWrapper>
        <PrimaryButton
          variant="secondary"
          type="button"
          onClick={() => setStep(1)}
        >
          <ArrowLeft /> Voltar
        </PrimaryButton>
        <PrimaryButton type="button" onClick={() => setStep(3)}>
          Avançar <ArrowRight />
        </PrimaryButton>
      </S.ForwardButtonWrapper>
    </>
  )
}
