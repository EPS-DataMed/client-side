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
import { useRef, useState, useEffect } from 'react'
import useNavigation from '../../hooks/useNavigation'
import { PAGE_PRINT_STYLE } from './constants'
import DatamedCard from './DatamedCard'
import useRemoveSpecificSvg from './hooks/useRemoveSpecificSvg'
import { schema } from './schema'
import { useLogout } from '../../hooks/useLogout'

type FormData = z.infer<typeof schema>

export function UserForm() {
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')
  const [userInfoFilled, setUserInfoFilled] = useState({} as User)

  const { handleSubmit, control, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const healthDataRef = useRef<HTMLDivElement | null>(null)
  const navigateTo = useNavigation()

  const handleNavigationToSubmission = () => {
    navigateTo('/submission', { replace: true })
  }

  const handleHealthDataPrint = useReactToPrint({
    content: () => healthDataRef.current,
    pageStyle: PAGE_PRINT_STYLE,
    documentTitle: 'graficos_exportados',
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

  function handleCloseDialog() {
    setDialogSubmissionStep('')
  }

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleUpdateDialogControlled(true)
    const USER_TO_PUT_IN_GRAPH: User = {
      ...data,
      name: 'Elvis Presley',
      age: 40,
    }
    setDialogSubmissionStep('save_form')
    setUserInfoFilled({ ...USER_TO_PUT_IN_GRAPH })
  }

  useRemoveSpecificSvg()
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
              <GenericPage.ProfileButton letter="D" />
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

      {hasObjectValidKeys(userInfoFilled) && (
        <S.PrintComponent>
          <DatamedCard user={userInfoFilled} componentRef={healthDataRef} />
        </S.PrintComponent>
      )}
    </>
  )
}
