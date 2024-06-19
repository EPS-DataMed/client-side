import { Controller } from 'react-hook-form'
import InputField from '../../../../components/Input/InputField'
import { StepProps } from '../../interfaces'
import { Input } from '../../../../components/Input'
import { SelectConfig } from '../../../../components/Select/SelectConfig'
import { MEDICAL_SPECIALTIES } from '../../constants'
import * as S from '../../styles'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { ArrowLeft } from '../../../../assets/icons'
import { Spinner } from '../../../../components/Spinner'

export function Step3({
  control,
  errors,
  loading,
  setStep,
  handleNextStep,
  isMedicalInfoFilled,
}: StepProps) {
  return (
    <>
      <S.SignupInstruction data-testid="signup-instruction">
        Se você for <b>médico</b>, preencha as informações abaixo, se não apenas
        continue o cadastro.
      </S.SignupInstruction>
      <S.SignupFieldsForm data-testid="signup-fields-form">
        <InputField
          label="CRM"
          name="crm"
          control={control}
          description="Informe o ESTADO/CRM."
          mask="aa/999999"
        />

        <Controller
          name="specialty"
          control={control}
          render={({ field }) => (
            <Input.Root>
              <Input.Label>Especialidade</Input.Label>
              <Input.Description>
                Selecione sua especialidade.
              </Input.Description>
              <SelectConfig
                items={MEDICAL_SPECIALTIES.map((specialty) => ({
                  value: specialty,
                  label: specialty,
                }))}
                handleValueChange={field.onChange}
                defaultValue={field.value}
                dataTestId="select-specialty"
              />
              {errors.specialty && (
                <Input.ErrorMessageRoot>
                  <Input.ErrorMessage data-testid="error-specialty">
                    {errors.specialty.message}
                  </Input.ErrorMessage>
                </Input.ErrorMessageRoot>
              )}
            </Input.Root>
          )}
        />
      </S.SignupFieldsForm>

      <S.ForwardButtonWrapper>
        <PrimaryButton
          variant="secondary"
          type="button"
          onClick={() => setStep(2)}
          data-testid="button-back"
        >
          <ArrowLeft /> Voltar
        </PrimaryButton>
        <PrimaryButton
          type="submit"
          onClick={handleNextStep}
          disabled={loading}
          data-testid="button-submit"
        >
          {loading ? (
            <>
              Carregando <Spinner data-testid="spinner" />
            </>
          ) : (
            `${isMedicalInfoFilled ? `Cadastrar` : `Pular e Cadastrar`}`
          )}
        </PrimaryButton>
      </S.ForwardButtonWrapper>
    </>
  )
}
