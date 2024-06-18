import { ErrorToast } from '../../../../../components/Toast'
import { createDownloadLink } from '../../../../../utils/dowloadLink'
import { CONTACT_EMAIL, PROJECT_NAME } from '../../../constants'
import { generatePrivacy, generateTerms } from '../../../services'

export const useFileGenerator = () => {
  const handleGenerateFile = async (
    type: 'terms' | 'privacy',
    errorMessage: string,
  ) => {
    try {
      const data = await (type === 'terms'
        ? generateTerms({
            projectName: PROJECT_NAME,
            contactEmail: CONTACT_EMAIL,
          })
        : generatePrivacy({
            projectName: PROJECT_NAME,
            contactEmail: CONTACT_EMAIL,
          }))
      createDownloadLink({
        data,
        fileName: `${PROJECT_NAME.toLowerCase()}_${type}.pdf`,
      })
    } catch (error) {
      ErrorToast(errorMessage)
    }
  }

  return { handleGenerateFile }
}
