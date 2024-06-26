import { Controller } from 'react-hook-form'
import { Input } from '../../../../components/Input'
import { SelectConfig } from '../../../../components/Select/SelectConfig'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { ArrowRight } from '../../../../assets/icons'
import { Sex, StepProps } from '../../interfaces'
import * as S from '../../styles'
import InputField from '../../../../components/Input/InputField'

export function Step1({ control, errors, setStep }: StepProps) {
  return (
    <>
      <S.SignupInstruction data-testid="signup-instruction">
        Preencha suas <b>informações básicas</b> e avance para a próxima etapa.
      </S.SignupInstruction>
      <S.SignupFieldsForm data-testid="signup-fields-form">
        <InputField
          label="Nome Completo"
          name="name"
          control={control}
          description="Informe o seu nome completo, sem abreviações."
          required
          data-testid="input-name"
        />

        <InputField
          label="E-mail"
          name="email"
          control={control}
          description="Informe o seu e-mail pessoal."
          required
          data-testid="input-email"
        />

        <InputField
          label="Data de Nascimento"
          name="dateOfBirth"
          control={control}
          description="Informe sua data de nascimento."
          required
          type="text"
          mask="99/99/9999"
          data-testid="input-dateOfBirth"
        />

        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Input.Label>Sexo *</Input.Label>
              <Input.Description>Informe seu sexo.</Input.Description>
              <SelectConfig
                items={[
                  { value: Sex.Masculino, label: 'Masculino' },
                  { value: Sex.Feminino, label: 'Feminino' },
                ]}
                hasError={!!errors.sex?.message}
                handleValueChange={field.onChange}
                defaultValue={field.value}
                data-testid="select-sex"
              />
              {errors.sex && (
                <Input.ErrorMessageRoot>
                  <Input.ErrorMessage data-testid="error-sex">
                    {errors.sex.message}
                  </Input.ErrorMessage>
                </Input.ErrorMessageRoot>
              )}
            </Input.Root>
          )}
        />
      </S.SignupFieldsForm>

      <S.ForwardButtonWrapper>
        <PrimaryButton
          type="button"
          onClick={() => setStep(2)}
          data-testid="button-next"
        >
          Avançar <ArrowRight />
        </PrimaryButton>
      </S.ForwardButtonWrapper>
    </>
  )
}
