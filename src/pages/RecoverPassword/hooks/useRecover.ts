import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import { RecoverFormData } from '../schema'
import { ErrorToast } from '../../../components/Toast'

export const useRecover = () => {
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<RecoverFormData> = async (data) => {
    setLoading(true)
    try {
      console.log(data)
    } catch (error) {
      ErrorToast(
        'Não foi possível enviar o e-mail. Tente novamente mais tarde.',
      )
    } finally {
      setLoading(false)
    }
  }

  return { loading, onSubmit }
}
