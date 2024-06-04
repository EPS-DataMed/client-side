import { Controller } from 'react-hook-form'
import InputField from '../../../../components/Input/InputField'
import { StepProps } from '../../interfaces'
import { Input } from '../../../../components/Input'
import { SelectConfig } from '../../../../components/Select/SelectConfig'
import { MEDICAL_SPECIALTIES } from '../../constants'
import * as S from '../../styles'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { ArrowLeft } from '../../../../assets/icons'

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
      <S.SignupInstruction>
        Se você for <b>médico</b>, preencha as informações abaixo, se não apenas
        continue o cadastro.
      </S.SignupInstruction>
      <S.SignupFieldsForm>
        <InputField
          label="CRM"
          name="crm"
          control={control}
          description="Informe o CRM/ESTADO."
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
              />
              {errors.specialty && (
                <Input.ErrorMessageRoot>
                  <Input.ErrorMessage>
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
        >
          <ArrowLeft /> Voltar
        </PrimaryButton>
        <PrimaryButton
          type="submit"
          onClick={handleNextStep}
          disabled={loading}
        >
          {loading
            ? 'Carregando...'
            : `${isMedicalInfoFilled ? `Cadastrar` : `Pular e Cadastrar`}`}
        </PrimaryButton>
      </S.ForwardButtonWrapper>
    </>
  )
}
