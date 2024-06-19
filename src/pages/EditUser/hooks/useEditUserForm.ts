
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditFormData, EditSchema } from '../schema/index'

export const useEditUserForm = () => {
  
  
  

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const onSubmit: SubmitHandler<any> = async () => {
    // setLoading(true)
    // try {
    //   openEditDialog()
    //   console.log(data)
    //   const newPasswordPayload = {
    //     full_name: data.full_name,
    //     email: data.email,
    //     birth_date: data.birth_date,
    //     biological_sex: data.biological_sex,
    //     password: data.newPassword,
    //   }

    //   const userResponse = await editPassword(data.userId, newPasswordPayload)

      

    //   SuccessToast('Senha alterada com sucesso!')
    //   console.log("deu ceeto")
    //   navigateTo('/', { replace: true })
    // } catch (error) {
    //   ErrorToast('Erro mudar senha. Tente novamente mais tarde.')
    //   console.error('Erro mudar senha:', error)
    // } finally {
    //   setLoading(false)
    // }
  }

  

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
  }
}
