import { useQuery } from 'react-query'
import { validateEmailToken } from '../services'
import { ErrorToast } from '../../../components/Toast'

export const useValidateEmailToken = (token: string) => {
  return useQuery(
    ['validateEmailToken', token],
    async () => {
      const response = await validateEmailToken(token)
      if (!response.is_valid) {
        ErrorToast('Não é possível atualizar sua senha. O link expirou.')
      }
      return response
    },
    {
      enabled: !!token,
      onError: () => {
        ErrorToast('Não é possível atualizar sua senha. O link expirou.')
      },
    },
  )
}
