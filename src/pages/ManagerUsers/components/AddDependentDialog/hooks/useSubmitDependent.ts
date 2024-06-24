import { useState } from 'react'
import { confirmUserDependent } from '../../../services'
import { getUserId } from '../../../../../utils/getUserId'
import { getCookie } from '../../../../../utils/cookies'
import { FormAddDependentData } from '..'
import { ErrorToast, SuccessToast } from '../../../../../components/Toast'

export function useSubmitDependent() {
  const [loading, setLoading] = useState(false)

  const { userId } = getUserId()
  const token = getCookie('access_token')

  const onSubmit = async (data: FormAddDependentData) => {
    try {
      setLoading(true)
      await confirmUserDependent({
        token: token as string,
        userId: userId as number,
        email: data.email,
      })
      SuccessToast('E-mail enviado com sucesso!')
    } catch (e) {
      ErrorToast('Falha ao enviar e-mail tente novamente mais tarde.')
    } finally {
      setLoading(false)
    }
  }

  return {
    onSubmit,
    loading,
  }
}
