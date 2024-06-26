import { useState } from 'react'
import { RecoverFormData } from '../schema'
import { forgotPassword } from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false)

  const submitForgotPassword = async (data: RecoverFormData) => {
    setLoading(true)
    try {
      await forgotPassword({ email: data.email })
      SuccessToast(
        'E-mail enviado com sucesso! Confira sua caixa de mensagens! Pode demorar um pouco, aguarde!',
      )
    } catch (error) {
      ErrorToast(
        'Verifique suas informações novamente! Ou tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return { submitForgotPassword, loading }
}
