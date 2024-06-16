import { Controller } from 'react-hook-form'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { StepProps } from '../../interfaces'
import * as S from '../../styles'
import Checkbox from '../../../../components/Checkbox'
import { ArrowLeft, ArrowRight } from '../../../../assets/icons'
import { Input } from '../../../../components/Input'

export function Step2({ control, errors, setStep }: StepProps) {
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

        <Controller
          name="termsOfPrivacy"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked)
              }}
              label="Eu aceito os Termos de Privacidade"
            />
          )}
        />
        {errors.termsOfPrivacy && (
          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>
              {errors.termsOfPrivacy.message}
            </Input.ErrorMessage>
          </Input.ErrorMessageRoot>
        )}

        <Controller
          name="termsOfUse"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked)
              }}
              label="Eu aceito os Termos de Uso"
            />
          )}
        />
        {errors.termsOfUse && (
          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{errors.termsOfUse.message}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>
        )}
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
