import { Controller } from 'react-hook-form'
import InputField from '../../../../components/Input/InputField'
import { PrimaryButton } from '../../../../components/PrimaryButton'
import { StepProps } from '../../interfaces'
import * as S from '../../styles'
import Checkbox, { PrivacyLink } from '../../../../components/Checkbox'
import { ArrowLeft, ArrowRight } from '../../../../assets/icons'
import { Input } from '../../../../components/Input'
import { generatePrivacy, generateTerms } from '../../services'
import { ErrorToast } from '../../../../components/Toast'

export function Step2({ control, errors, setStep }: StepProps) {
  const handleTermsOfUseClick = async () => {
    const projectName = 'Datamed'
    const contactEmail = 'datamedoficial@gmail.com'

    try {
      const data = await generateTerms({ projectName, contactEmail })
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectName.toLowerCase()}_terms.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (error) {
      ErrorToast('Erro ao gerar os termos, tente novamente mais tarde.')
    }
  }

  const handlePrivacyClick = async () => {
    const projectName = 'Datamed'
    const contactEmail = 'datamedoficial@gmail.com'

    try {
      const data = await generatePrivacy({ projectName, contactEmail })
      const url = window.URL.createObjectURL(data)
      const a = document.createElement('a')
      a.href = url
      a.download = `${projectName.toLowerCase()}_privacy.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
    } catch (error) {
      ErrorToast(
        'Erro ao gerar os termos de privacidade, tente novamente mais tarde.',
      )
    }
  }

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
              label={
                <>
                  Eu aceito os{' '}
                  <PrivacyLink onClick={handlePrivacyClick}>
                    Termos de Privacidade
                  </PrivacyLink>
                </>
              }
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
              label={
                <>
                  Eu aceito os{' '}
                  <PrivacyLink onClick={handleTermsOfUseClick}>
                    Termos de Uso
                  </PrivacyLink>
                </>
              }
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
