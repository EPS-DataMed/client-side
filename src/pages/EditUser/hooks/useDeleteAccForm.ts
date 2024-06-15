import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import useNavigation from '../../../hooks/useNavigation'
import { DeleteAccData, DeleteAccSchema } from '../schema/index'
import { deleteAccount } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'

export const useDeleteAccForm = () => {
  const navigateTo = useNavigation()
  const [loading, setLoading] = useState(false)
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
  } = useForm<DeleteAccData>({
    resolver: zodResolver(DeleteAccSchema),
    defaultValues: {
      password: '',
      confirmNewPassword: ''
    },
  })

//   const crm = watch('crm')
//   const specialty = watch('specialty')
//   const isMedicalInfoFilled = !!crm && !!specialty

//   const findEditPasswordError = async () => {
//     const fields = [
//         'password',
//         'newPassword',
//         'confirmNewPassword'
//     ]
//     for (let i = 0; i < fields.length; i++) {
//       const valid = await trigger(fields[i] as keyof DeleteAccData)
//       if (!valid) {
//         return fields[i]
//       }
//     }
//     return null
//   }

  const onSubmit: SubmitHandler<DeleteAccData> = async (data) => {
    setLoading(true)
    try {
      

      

      const userResponse = await deleteAccount(data.userId)

      

      SuccessToast('Conta apagada com sucesso !')

      navigateTo('/', { replace: true })
    } catch (error) {
      ErrorToast('Erro ao apagar conta. Tente novamente mais tarde.')
      console.error('Erro ao apagar conta:', error)
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
