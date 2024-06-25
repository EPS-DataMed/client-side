import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { ChangePasswordFormData } from '../schema'
import { ErrorToast, SuccessToast } from '../../../components/Toast'
import { updatePassword } from '../services'
import { useParams } from 'react-router-dom'

export const useChangePassword = () => {
  const { userId } = useParams()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<ChangePasswordFormData> = async (data) => {
    setLoading(true)
    try {
      await updatePassword({ password: data.password, userId: Number(userId) })
      SuccessToast('Senha alterada com sucesso!')
    } catch (error) {
      ErrorToast(
        'Verifique suas informações novamente! Ou tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
