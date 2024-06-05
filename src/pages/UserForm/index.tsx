import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import AdditionalInfo from './components/AdditionalInfo'
import PersonalInfo from './components/PersonalInfo'
import HealthData from './components/HealthData'
import { GenericPage } from '../../components/GenericPage'
import { Breadcrumb } from '../../components/Breadcrumb'
import { useBreadcrumbs } from './hooks/useBreadcrumbs'
import * as S from './styles'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ArrowLeft } from '../../assets/icons'
import {
  DialogControlled,
  useDialogControlled,
} from '../../components/DialogControlled'
import { isNotUndefined } from '../../interfaces/typeGuards'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { DialogStep } from './interfaces'
import { useState } from 'react'
import useNavigation from '../../hooks/useNavigation'

const schema = z.object({
  weight: z.string().min(1, 'Campo obrigatório'),
  height: z.string().min(1, 'Campo obrigatório'),
  bmi: z.string().min(1, 'Campo obrigatório'),
  bloodType: z.string().min(1, 'Campo obrigatório'),
  abdominalCircumference: z.string().min(1, 'Campo obrigatório'),
  hemoglobin: z.string().min(1, 'Campo obrigatório'),
  ast: z.string().min(1, 'Campo obrigatório'),
  alt: z.string().min(1, 'Campo obrigatório'),
  urea: z.string().min(1, 'Campo obrigatório'),
  creatinine: z.string().min(1, 'Campo obrigatório'),
  hematocrit: z.string().min(1, 'Campo obrigatório'),
  hemoglobinA1c: z.string().min(1, 'Campo obrigatório'),
  glycatedHemoglobin: z.string().min(1, 'Campo obrigatório'),
  allergies: z.string().min(1, 'Campo obrigatório'),
  diseases: z.string().min(1, 'Campo obrigatório'),
  medications: z.string().min(1, 'Campo obrigatório'),
  familyHistory: z.string().min(1, 'Campo obrigatório'),
  importantNotes: z.string().min(1, 'Campo obrigatório'),
  imageReports: z.string().min(1, 'Campo obrigatório'),
})

type FormData = z.infer<typeof schema>

export function UserForm() {
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')

  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission', { replace: true })
  }

  const { dialogItemToRender } = useDialogItemToRender({
    dialogSubmissionStep,
    handleNavigationToSubmission,
  })

  function handleCloseDialog() {
    setDialogSubmissionStep('')
  }

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleUpdateDialogControlled(true)
    setDialogSubmissionStep('save_form')
    console.log(data)
  }

  const BREADCRUMBS = useBreadcrumbs()

  return (
    <>
      <GenericPage.Root>
        <S.Header>
          <S.WrapperLogoAndLogoTitle>
            <GenericPage.Logo />
            <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
          </S.WrapperLogoAndLogoTitle>
          <Breadcrumb items={BREADCRUMBS} />
        </S.Header>

        <GenericPage.Divider />

        <S.MainContent>
          <S.WrapperPageInformation>
            <GenericPage.Title data-testid="page-title">
              Formulário
            </GenericPage.Title>
            <GenericPage.Description data-testid="page-description">
              Preencha o formulário abaixo com os campos faltantes, se houver.
              Ao final, conclua e gere um <b>cartão</b> com suas informações
              pessoais de saúde derivadas do seu exame.
            </GenericPage.Description>
          </S.WrapperPageInformation>

          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalInfo control={control} />
            <HealthData control={control} />
            <AdditionalInfo control={control} />

            <S.WrapperButton>
              <PrimaryButton
                type="button"
                variant="secondary"
                onClick={handleNavigationToSubmission}
              >
                <ArrowLeft /> Voltar
              </PrimaryButton>
              <S.ButtonStyled type="submit">Finalizar</S.ButtonStyled>
            </S.WrapperButton>

            <GenericPage.Divider />
          </form>
        </S.MainContent>
      </GenericPage.Root>
      {isDialogControlledOpen && isNotUndefined(dialogItemToRender) && (
        <DialogControlled
          isDialogControlledOpen={isDialogControlledOpen}
          handleUpdateDialogControlled={handleUpdateDialogControlled}
          dialogItemToRender={dialogItemToRender}
          isLoadingRequisition={false}
          onClose={handleCloseDialog}
        />
      )}
    </>
  )
}
