import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useNavigation from '../../../hooks/useNavigation'
import { SignupFormData, SignupSchema } from '../schema'
import { formatDate } from '../utils'
import { createDoctor, createUser } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'

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

      const userPayload = {
        nome_completo: data.name,
        email: data.email,
        data_nascimento: formattedDateOfBirth,
        sexo_biologico: data.sex === 'Masculino' ? 'M' : 'F',
        formulario: {},
        status_formulario: 'Não iniciado',
        senha: data.password,
      }

      const userResponse = await createUser(userPayload)

      const userId = userResponse.content.id

      if (isMedicalInfoFilled) {
        const doctorPayload = {
          crm: data.crm as string,
          especialidade: data.specialty as string,
          id_usuario: userId,
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
