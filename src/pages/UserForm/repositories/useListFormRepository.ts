import { useQuery } from 'react-query'
import { getFormAndLatestTests } from '../services'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import useNavigation from '../../../hooks/useNavigation'
import { useParams } from 'react-router-dom'
import { getDependents } from '../../Submission/services'

export function useListFormRepository() {
  const { setProcessFormData } = useSubmissionTestContext()
  const userId = getUserId()?.userId
  const token = getCookie('access_token')
  const { dependentId } = useParams<{ dependentId: string }>()
  const navigateTo = useNavigation()

  const fetchForm = async (): Promise<void> => {
    try {
      if (dependentId !== 'null') {
        const dependentResponse = await getDependents({
          token: token as string,
          userId: userId as number,
          dependentId: dependentId as string,
        })

        if (dependentResponse.confirmed) {
          const response = await getFormAndLatestTests({
            token: token as string,
            userId: Number(dependentId),
          })

          setProcessFormData(response)
        } else {
          navigateTo('/', { replace: true })
        }
      } else {
        const response = await getFormAndLatestTests({
          token: token as string,
          userId: userId as number,
        })

        setProcessFormData(response)
      }
    } catch (error) {
      console.error('Error fetching exams or dependents:', error)
    }
  }

  useQuery([`fetchForm`], fetchForm, {
    refetchOnWindowFocus: false,
  })
}
