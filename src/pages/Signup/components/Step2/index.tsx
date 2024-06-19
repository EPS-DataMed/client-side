import { Controller } from 'react-hook-form'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { StepProps } from '../../interfaces'
import * as S from '../../styles'
import Checkbox, { PrivacyLink } from '../../../../components/Checkbox'
import { ArrowLeft, ArrowRight } from '../../../../assets/icons'
import { Input } from '../../../../components/Input'
import { useFileGenerator } from './hooks/useFileGenerator'

export function Step2({ control, errors, setStep }: StepProps) {
  const { handleGenerateFile } = useFileGenerator()

  return (
    <>
      <S.SignupInstruction data-testid="signup-instruction">
        Por favor, preencha sua <b>senha</b> para acessar a plataforma e
        aproveitar todos os recursos disponíveis.
      </S.SignupInstruction>
      <S.SignupFieldsForm data-testid="signup-fields-form">
        <InputField
          label="Senha"
          name="password"
          type="password"
          control={control}
          description="Deve conter pelo menos oito caracteres, com letras e números."
          required
          data-testid="input-password"
        />

        <InputField
          label="Confirme sua senha"
          name="confirmPassword"
          control={control}
          type="password"
          description="Confirme sua senha definida no campo acima."
          required
          data-testid="input-confirmPassword"
        />

        <Controller
          name="termsOfPrivacy"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              label={
                <>
                  Eu aceito os{' '}
                  <PrivacyLink
                    onClick={() =>
                      handleGenerateFile(
                        'privacy',
                        'Erro ao gerar os termos de privacidade, tente novamente mais tarde.',
                      )
                    }
                    data-testid="link-privacy"
                  >
                    Termos de Privacidade
                  </PrivacyLink>
                </>
              }
              data-testid="checkbox-privacy"
            />
          )}
        />
        {errors.termsOfPrivacy && (
          <Input.ErrorMessageRoot>
            <Input.ErrorMessage data-testid="error-termsOfPrivacy">
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
              onChange={(e) => field.onChange(e.target.checked)}
              label={
                <>
                  Eu aceito os{' '}
                  <PrivacyLink
                    onClick={() =>
                      handleGenerateFile(
                        'terms',
                        'Erro ao gerar os termos, tente novamente mais tarde.',
                      )
                    }
                    data-testid="link-terms"
                  >
                    Termos de Uso
                  </PrivacyLink>
                </>
              }
              data-testid="checkbox-terms"
            />
          )}
        />
        {errors.termsOfUse && (
          <Input.ErrorMessageRoot>
            <Input.ErrorMessage data-testid="error-termsOfUse">
              {errors.termsOfUse.message}
            </Input.ErrorMessage>
          </Input.ErrorMessageRoot>
        )}
      </S.SignupFieldsForm>

      <S.ForwardButtonWrapper>
        <PrimaryButton
          variant="secondary"
          type="button"
          onClick={() => setStep(1)}
          data-testid="button-back"
        >
          <ArrowLeft /> Voltar
        </PrimaryButton>
        <PrimaryButton
          type="button"
          onClick={() => setStep(3)}
          data-testid="button-next"
        >
          Avançar <ArrowRight />
        </PrimaryButton>
      </S.ForwardButtonWrapper>
    </>
  )
}
