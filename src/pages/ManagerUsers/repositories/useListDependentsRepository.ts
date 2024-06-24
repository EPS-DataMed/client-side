import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import { deleteUserDependent, listUserDependents } from '../services'
import { Dependent } from '../interfaces'
import { ErrorToast, SuccessToast } from '../../../components/Toast'
import { useUserContext } from '../../../contexts/UserContext'

export function useListDependentsRepository() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [dependentToDelete, setDependentToDelete] = useState<Dependent | null>(
    null,
  )
  const { userId } = getUserId()
  const token = getCookie('access_token')

  const [dependents, setDependents] = useState<Dependent[]>([])
  const { isDoctor } = useUserContext()

  async function fetchListDependents(): Promise<Dependent[]> {
    const response = await listUserDependents({
      userId: userId as number,
      token: token as string,
    })
    return response
  }

  const { isFetching: isListDependentsLoading } = useQuery(
    [`dependents-${userId}`],
    fetchListDependents,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setDependents(data)
      },
    },
  )

  const deleteDependentDialog = useCallback(async () => {
    const { userId } = getUserId()
    const token = getCookie('access_token')

    if (!dependentToDelete) return

    setIsDeleting(true)
    try {
      const updatedDependents = dependents.filter(
        (dependent) =>
          dependent.dependent_id !== dependentToDelete.dependent_id,
      )
      setDependents(updatedDependents)

      await deleteUserDependent({
        userId: userId as number,
        token: token as string,
        dependentId: dependentToDelete.dependent_id,
      })

      SuccessToast(
        isDoctor
          ? 'Paciente excluído com sucesso!'
          : 'Dependente excluído com sucesso!',
      )
    } catch (e) {
      ErrorToast(
        'Não foi possível realizar a ação, tente novamente mais tarde.',
      )
    } finally {
      setIsDeleting(false)
    }
  }, [dependentToDelete, dependents, isDoctor, setDependents])

  return {
    isListDependentsLoading,
    dependents,
    setDependents,
    deleteDependentDialog,
    dependentToDelete,
    setDependentToDelete,
    isDeleting,
  }
}
