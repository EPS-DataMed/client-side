import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDependents, processExams } from '../services'
import { getUserId } from '../../../utils/getUserId'
import { getCookie } from '../../../utils/cookies'
import useNavigation from '../../../hooks/useNavigation'
import { ErrorToast } from '../../../components/Toast'

export function useSubmissionTestHook(filesUploaded: any[]) {
  const [isLoadingSubmissionTest, setIsLoadingSubmissionTest] = useState(false)
  const { dependentId } = useParams()
  const { userId } = getUserId()
  const token = getCookie('access_token')
  const navigateTo = useNavigation()

  useEffect(() => {
    if (Number(dependentId) === Number(userId))
      navigateTo('/submission/home/null', { replace: true })
  }, [dependentId, navigateTo, userId])

  async function handleSubmissionTest() {
    setIsLoadingSubmissionTest(true)
    const examIndexes = filesUploaded.map((file) => file.id)

    try {
      if (dependentId !== 'null') {
        const dependentResponse = await getDependents({
          token: token as string,
          userId: userId as number,
          dependentId: dependentId as string,
        })

        if (dependentResponse.confirmed) {
          await processExams({
            examIndexes,
            token: token as string,
            userId: Number(dependentId) as number,
          })
          navigateTo(`/form/${dependentId}`)
        } else {
          navigateTo('/', { replace: true })
        }
      } else {
        await processExams({
          examIndexes,
          token: token as string,
          userId: userId as number,
        })
        navigateTo('/form/null')
      }
    } catch (err) {
      ErrorToast('Falha ao processar dados, tente novamente mais tarde!')
    } finally {
      setIsLoadingSubmissionTest(false)
    }
  }

  return {
    isLoadingSubmissionTest,
    handleSubmissionTest,
  }
}
