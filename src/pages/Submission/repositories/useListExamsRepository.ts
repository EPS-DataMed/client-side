import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { useCallback } from 'react'
import { getExams, getDependents } from '../services'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import useNavigation from '../../../hooks/useNavigation'

export function useListExamsRepository() {
  const { setFilesUploaded } = useSubmissionTestContext()
  const { userId } = getUserId()
  const token = getCookie('access_token')
  const { dependentId } = useParams<{ dependentId: string }>()
  const navigateTo = useNavigation()

  const fetchListExams = useCallback(async (): Promise<void> => {
    try {
      if (dependentId !== 'null') {
        const dependentResponse = await getDependents({
          token: token as string,
          userId: userId as number,
          dependentId: dependentId as string,
        })

        if (dependentResponse.confirmed) {
          const examsResponse = await getExams({
            token: token as string,
            userId: Number(dependentId),
          })
          setFilesUploaded(examsResponse)
        } else {
          navigateTo('/', { replace: true })
        }
      } else {
        const examsResponse = await getExams({
          token: token as string,
          userId: userId as number,
        })
        setFilesUploaded(examsResponse)
      }
    } catch (error) {
      console.error('Error fetching exams or dependents:', error)
      navigateTo('/', { replace: true })
    }
  }, [dependentId, token, userId, setFilesUploaded, navigateTo])

  const { isFetching: isListExamsLoading } = useQuery(
    [`exames`],
    fetchListExams,
  )

  return { isListExamsLoading }
}
