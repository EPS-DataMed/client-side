import { useQuery } from 'react-query'
import { getExams } from '../services'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'

export function listExamsRepository() {
  const { setFilesUploaded } = useSubmissionTestContext()

  const { userId } = getUserId()
  const token = getCookie('access_token')

  async function fetchListExams(): Promise<void> {
    const response = await getExams({
      token: token as string,
      userId: userId as number,
    })

    setFilesUploaded(response)
  }

  const { isFetching: isListExamsLoading } = useQuery(
    [`exames-${1}`],
    fetchListExams,
    {
      refetchOnWindowFocus: false,
    },
  )

  return { isListExamsLoading }
}
