import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useNavigation from '../../../hooks/useNavigation'
import { EditFormData, EditSchema } from '../schema/index'
import { editPassword } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'

export const useEditUserForm = () => {
  const navigateTo = useNavigation()
  const [loading, setLoading] = useState(false)
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<EditFormData>({
    resolver: zodResolver(EditSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    },
  })

//   const crm = watch('crm')
//   const specialty = watch('specialty')
//   const isMedicalInfoFilled = !!crm && !!specialty

  // const findEditPasswordError = async () => {
  //   const fields = [
  //       'password',
  //       'newPassword',
  //       'confirmNewPassword'
  //   ]
  //   for (let i = 0; i < fields.length; i++) {
  //     const valid = await trigger(fields[i] as keyof EditFormData)
  //     if (!valid) {
  //       return fields[i]
  //     }
  //   }
  //   return null
  // }

  const onSubmit: SubmitHandler<EditFormData> = async (data) => {
    setLoading(true)
    try {
      

      const newPasswordPayload = {
        senha: data.newPassword,
      }

      const userResponse = await editPassword(data.userId, newPasswordPayload)

      

      SuccessToast('Senha alterada com sucesso!')

      navigateTo('/', { replace: true })
    } catch (error) {
      ErrorToast('Erro mudar senha. Tente novamente mais tarde.')
      console.error('Erro mudar senha:', error)
    } finally {
      setLoading(false)
    }
  }

  

  return {
    control,
    handleSubmit,
    errors,
    loading,
    onSubmit,
  }
}
