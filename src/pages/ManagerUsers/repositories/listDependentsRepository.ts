import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import { listUserDependents } from '../services'
import { Dependent } from '../interfaces'

export function listDependentsRepository() {
  const { userId } = getUserId()
  const token = getCookie('access_token')

  const [dependents, setDependents] = useState<Dependent[]>([])

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

  return { isListDependentsLoading, dependents, setDependents }
}
