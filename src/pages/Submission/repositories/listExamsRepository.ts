import { useQuery } from 'react-query'
import { getExams } from '../services'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'

export function listExamsRepository() {
  const { setFilesUploaded } = useSubmissionTestContext()

  // const token = getCookie('access_token')
  // const { user_id } =

  async function fetchListExams(): Promise<void> {
    const response = await getExams(1)

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
