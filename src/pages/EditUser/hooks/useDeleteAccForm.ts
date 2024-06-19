
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DeleteAccData, DeleteAccSchema } from '../schema/index'



export const useDeleteAccForm = () => {
  
  
  

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccData>({
    resolver: zodResolver(DeleteAccSchema),
    defaultValues: {
      currentPassword: '',
      confirmPassword: ''
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

  

  

  return {
    control,
    handleSubmit,
    errors,
  }
}
