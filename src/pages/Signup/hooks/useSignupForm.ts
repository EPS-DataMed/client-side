import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useNavigation from '../../../hooks/useNavigation'
import { SignupFormData, SignupSchema } from '../schema'
import { createDoctor, createUser } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'
import { formatDate } from '../utils'

export const useSignupForm = () => {
  const navigateTo = useNavigation()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: '',
      sex: '',
      password: '',
      confirmPassword: '',
      crm: '',
      specialty: '',
      termsOfPrivacy: false,
      termsOfUse: false,
    },
  })

  const crm = watch('crm')
  const specialty = watch('specialty')
  const isMedicalInfoFilled = !!crm && !!specialty

  const findFirstErrorStep = async () => {
    const fields = [
      'name',
      'email',
      'dateOfBirth',
      'sex',
      'password',
      'confirmPassword',
      'crm',
      'specialty',
      'termsOfPrivacy',
      'termsOfUse',
    ]
    for (let i = 0; i < fields.length; i++) {
      const valid = await trigger(fields[i] as keyof SignupFormData)
      if (!valid) {
        return fields[i]
      }
    }
    return null
  }

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setLoading(true)
    try {
      const formattedDateOfBirth = formatDate(data.dateOfBirth)
      //const formattedDateOfBirth = data.dateOfBirth
      const userPayload = {
        full_name: data.name,
        email: data.email,
        birth_date: formattedDateOfBirth,
        biological_sex: data.sex === 'Masculino' ? 'M' : 'F',
        password: data.password,
      }

      const userResponse = await createUser(userPayload)

      const userId = userResponse.content.id

      if (isMedicalInfoFilled) {
        const doctorPayload = {
          crm: data.crm as string,
          specialty: data.specialty as string,
          user_id: userId,
        }
        await createDoctor(doctorPayload)
      }

      SuccessToast('Usuário criado com sucesso!')

      navigateTo('/', { replace: true })
    } catch (error) {
      ErrorToast('Erro ao cadastrar usuário. Tente novamente mais tarde.')
      console.error('Erro ao cadastrar usuário:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNextStep = async () => {
    const firstError = await findFirstErrorStep()
    if (firstError) {
      switch (firstError) {
        case 'name':
        case 'email':
        case 'dateOfBirth':
        case 'sex':
          setStep(1)
          break
        case 'password':
        case 'confirmPassword':
        case 'termsOfPrivacy':
        case 'termsOfUse':
          setStep(2)
          break
        case 'crm':
        case 'specialty':
          setStep(3)
          break
        default:
          break
      }
    }
  }

  return {
    step,
    setStep,
    control,
    handleSubmit,
    errors,
    loading,
    isMedicalInfoFilled,
    onSubmit,
    handleNextStep,
  }
}
