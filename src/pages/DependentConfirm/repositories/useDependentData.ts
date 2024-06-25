import { useQuery, useMutation } from 'react-query'
import {
  getUserWithDoctor,
  createDependent,
  validateEmailToken,
} from '../services'
import { ErrorToast, SuccessToast } from '../../../components/Toast'

const fetchUserWithDoctor = async (userId: number) => {
  const user = await getUserWithDoctor({ userId })
  return user
}

const confirmDependent = async ({
  confirmed,
  dependentId,
  userId,
}: {
  confirmed: boolean
  dependentId: number
  userId: number
}) => {
  await createDependent({
    confirmed,
    dependent_id: dependentId,
    user_id: userId,
  })
}

export const useDependentData = (
  userId: number,
  dependentId: number,
  token: string,
) => {
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useQuery(['userWithDoctor', userId], () => fetchUserWithDoctor(userId), {
    enabled: false,
  })

  const { data: emailValidation, isLoading: isEmailValidating } = useQuery(
    ['validateEmailToken', token],
    () => validateEmailToken(token),
    {
      onSuccess: (data) => {
        if (data.is_valid) {
          refetchUser()
        } else {
          ErrorToast('Token de email inválido.')
        }
      },
      onError: () => {
        ErrorToast('Erro ao validar o token de email. O link é inválido.')
      },
    },
  )

  const mutation = useMutation(confirmDependent, {
    onError: () => {
      ErrorToast(
        'Não foi possível concluir a ação. Tente novamente mais tarde.',
      )
    },
    onSuccess: (_, { confirmed }) => {
      const textToDisplay = user?.doctor?.crm ? 'paciente' : 'dependente'
      if (confirmed) {
        SuccessToast(
          `Parabéns você é um ${textToDisplay} de ${user?.full_name}.`,
        )
      } else {
        SuccessToast('Sua dependência foi negada.')
      }
    },
  })

  const handleConfirmDependent = (
    confirmed: boolean,
    setLoading: (loading: boolean) => void,
  ) => {
    setLoading(true)
    mutation.mutate(
      { confirmed, dependentId, userId },
      {
        onSettled: () => setLoading(false),
      },
    )
  }

  return {
    user,
    isUserLoading: isUserLoading || isEmailValidating,
    isUserError,
    handleConfirmDependent,
    isMutating: mutation.isLoading,
    isEmailValid: emailValidation?.is_valid,
  }
}
