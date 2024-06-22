import { useForm, SubmitHandler, useWatch } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'
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
import { hasObjectValidKeys, isNotUndefined } from '../../interfaces/typeGuards'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'
import { DialogStep, User } from './interfaces'
import { useRef, useState, useEffect, useCallback } from 'react'
import useNavigation from '../../hooks/useNavigation'
import { PAGE_PRINT_STYLE } from './constants'
import DatamedCard from './DatamedCard'
import useRemoveSpecificSvg from './hooks/useRemoveSpecificSvg'
import { schema } from './schema'
import { useLogout } from '../../hooks/useLogout'
import { useSubmissionTestContext } from '../../contexts/SubmissionTestContext'
import { listFormRepository } from './repositories/listFormRepository'
import { updateForm } from './services'
import { convertUserToForm } from './utils'
import { ErrorToast } from '../../components/Toast'
import { getUserId } from '../../utils/getUserId'
import { getCookie } from '../../utils/cookies'
import { Spinner } from '../../components/Spinner'
import { getDependents } from '../Submission/services'
import { useParams } from 'react-router-dom'

type FormData = z.infer<typeof schema>

export function UserForm() {
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')
  const [userInfoFilled, setUserInfoFilled] = useState({} as User)
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false)

  const { formData } = useSubmissionTestContext()

  const initializeDefaultValues = useCallback(
    (data: Partial<User>) => ({
      weight: data.weight || '',
      height: data.height || '',
      bmi: data.bmi || '',
      bloodType: data.bloodType || '',
      abdominalCircumference: data.abdominalCircumference || '',
      hemoglobin: data.hemoglobin || '',
      redBloodCell: data.redBloodCell || '',
      ast: data.ast || '',
      alt: data.alt || '',
      urea: data.urea || '',
      creatinine: data.creatinine || '',
      hematocrit: data.hematocrit || '',
      glycatedHemoglobin: data.glycatedHemoglobin || '',
      allergies: data.allergies || '',
      diseases: data.diseases || '',
      medications: data.medications || '',
      familyHistory: data.familyHistory || '',
      importantNotes: data.importantNotes || '',
      imageReports: data.imageReports || '',
    }),
    [],
  )

  const { handleSubmit, control, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initializeDefaultValues({}),
  })

  useEffect(() => {
    if (formData) {
      reset(initializeDefaultValues(formData))
    }
  }, [formData, reset, initializeDefaultValues])

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()
  const healthDataRef = useRef<HTMLDivElement | null>(null)
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = useCallback(() => {
    navigateTo('/submission', { replace: true })
  }, [navigateTo])

  const handleHealthDataPrint = useReactToPrint({
    content: () => healthDataRef.current,
    pageStyle: PAGE_PRINT_STYLE,
    documentTitle: 'datamed_card',
    onAfterPrint: () => setUserInfoFilled({} as User),
  })

  const { handleOpenLogoutDialog, logoutConfig } = useLogout({
    handleOpenDialog: (value) => handleUpdateDialogControlled(value),
    handleStep: (value: DialogStep) => setDialogSubmissionStep(value),
  })

  const { dialogItemToRender } = useDialogItemToRender({
    dialogSubmissionStep,
    handleNavigationToSubmission,
    handleHealthDataPrint,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
    logoutConfig,
  })

  const handleCloseDialog = useCallback(() => {
    setDialogSubmissionStep('')
  }, [])

  const weight = useWatch({
    control,
    name: 'weight',
  })

  const height = useWatch({
    control,
    name: 'height',
  })

  useEffect(() => {
    if (weight && height) {
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height) / 100
      if (!isNaN(weightNum) && !isNaN(heightNum) && heightNum > 0) {
        const bmi = (weightNum / (heightNum * heightNum)).toFixed(2)
        setValue('bmi', bmi)
      }
    }
  }, [weight, height, setValue])

  const { userId } = getUserId()
  const token = getCookie('access_token')
  const { dependentId } = useParams<{ dependentId: string }>()

  const onSubmit: SubmitHandler<FormData> = useCallback(
    async (data) => {
      try {
        setIsLoadingSubmission(true)

        const dataFormated = { ...data, formStatus: 'Filled' } as User

        if (dependentId !== 'null') {
          const dependentResponse = await getDependents({
            token: token as string,
            userId: userId as number,
            dependentId: dependentId as string,
          })

          if (dependentResponse.confirmed) {
            await updateForm({
              userId: Number(dependentId),
              token: token as string,
              formData: convertUserToForm(dataFormated),
            })
          } else {
            navigateTo('/', { replace: true })
          }
        } else {
          await updateForm({
            userId: userId as number,
            token: token as string,
            formData: convertUserToForm(dataFormated),
          })
        }

        handleUpdateDialogControlled(true)
        const USER_TO_PUT_IN_GRAPH: User = {
          ...data,
          name: formData?.name as string,
          age: formData?.age as number,
        }

        setDialogSubmissionStep('save_form')
        setUserInfoFilled({ ...USER_TO_PUT_IN_GRAPH })
      } catch {
        ErrorToast('Erro ao salvar formulário. Tente novamente mais tarde.')
      } finally {
        setIsLoadingSubmission(false)
      }
    },
    [userId, token, formData, handleUpdateDialogControlled],
  )

  useRemoveSpecificSvg()
  listFormRepository()

  const BREADCRUMBS = useBreadcrumbs()

  return (
    <>
      <GenericPage.Root>
        <S.WrapperHeaderAndBreadcrumb>
          <GenericPage.Header>
            <S.WrapperLogoAndLogoTitle>
              <GenericPage.Logo />
              <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
            </S.WrapperLogoAndLogoTitle>

            <GenericPage.HeaderOptions>
              <GenericPage.ProfileButton />
              <GenericPage.LogoutButton action={handleOpenLogoutDialog} />
            </GenericPage.HeaderOptions>
          </GenericPage.Header>
          <Breadcrumb items={BREADCRUMBS} />
        </S.WrapperHeaderAndBreadcrumb>

        <GenericPage.Divider />

        <S.MainContent>
          <S.WrapperPageInformation>
            <GenericPage.Title data-testid="page-title">
              Formulário
            </GenericPage.Title>
            <GenericPage.Description data-testid="page-description">
              Preencha o formulário abaixo com os campos faltantes, se houver.
              Ao final, conclua e gere um <b>cartão</b> com o resumo dessas
              informações de saúde. O cartão incluirá detalhes importantes como
              dados pessoais, informações de saúde e outros dados relevantes
              derivados dos exames. Ao finalizar, você terá a opção de imprimir
              o cartão.
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
              <S.ButtonStyled type="submit">
                {isLoadingSubmission ? (
                  <>
                    Carregando <Spinner />
                  </>
                ) : (
                  'Finalizar'
                )}
              </S.ButtonStyled>
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
          isLoadingRequisition={isLoadingSubmission}
          onClose={handleCloseDialog}
        />
      )}

      {hasObjectValidKeys(userInfoFilled) && (
        <S.PrintComponent>
          <DatamedCard user={userInfoFilled} componentRef={healthDataRef} />
        </S.PrintComponent>
      )}
    </>
  )
}
