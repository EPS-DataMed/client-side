import { useQuery } from 'react-query'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import { getUserWithDoctor } from '../services'
import { useUserContext } from '../../../contexts/UserContext'

export function listUserInfoRepository() {
  const { userId } = getUserId()
  const token = getCookie('access_token')
  const { setUser } = useUserContext()

  async function fetchListExams(): Promise<void> {
    const response = await getUserWithDoctor({
      token: token as string,
      userId: userId as number,
    })

    setUser(response)
  }

  const { isLoading: isListUserInfoLoading } = useQuery(
    [`exames-${userId}`],
    fetchListExams,
    {
      refetchOnWindowFocus: false,
    },
  )

  return { isListUserInfoLoading }
}
