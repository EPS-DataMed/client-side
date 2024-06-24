import { useParams } from 'react-router-dom'
import { getCookie } from '../../../utils/cookies'
import { getUserId } from '../../../utils/getUserId'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import { getDependents } from '../../Submission/services'
import { updateForm } from '../services'
import { convertUserToForm } from '../utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogStep, User } from '../interfaces'
import useNavigation from '../../../hooks/useNavigation'
import { FormUserData, schema } from '../schema'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { ErrorToast } from '../../../components/Toast'
import { useDialogControlled } from '../../../components/DialogControlled'

export function useSubmitForm() {
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false)
  const [dialogSubmissionStep, setDialogSubmissionStep] =
    useState<DialogStep>('')
  const [userInfoFilled, setUserInfoFilled] = useState({} as User)

  const { handleUpdateDialogControlled, isDialogControlledOpen } =
    useDialogControlled()

  const { formData } = useSubmissionTestContext()

  const { userId } = getUserId()
  const token = getCookie('access_token')
  const { dependentId } = useParams<{ dependentId: string }>()
  const navigateTo = useNavigation()

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

  const { handleSubmit, control, setValue, reset } = useForm<FormUserData>({
    resolver: zodResolver(schema),
    defaultValues: initializeDefaultValues({}),
  })

  useEffect(() => {
    if (formData) {
      reset(initializeDefaultValues(formData))
    }
  }, [formData, reset, initializeDefaultValues])

  const onSubmit: SubmitHandler<FormUserData> = useCallback(
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
    [
      dependentId,
      handleUpdateDialogControlled,
      formData?.name,
      formData?.age,
      token,
      userId,
      navigateTo,
    ],
  )

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

  const handleNavigationToSubmission = useCallback(() => {
    navigateTo('/home', { replace: true })
  }, [navigateTo])

  return {
    setUserInfoFilled,
    handleUpdateDialogControlled,
    setDialogSubmissionStep,
    dialogSubmissionStep,
    handleNavigationToSubmission,
    handleSubmit,
    onSubmit,
    isLoadingSubmission,
    isDialogControlledOpen,
    handleCloseDialog,
    userInfoFilled,
    control,
  }
}
