import { useUserContext } from '../../../contexts/UserContext'

export function useWelcomeMessage() {
  const { isUserExists, user } = useUserContext()

  if (!isUserExists || !user || !user.full_name) {
    return { welcomeMessageText: '' }
  }

  const firstName = user.full_name.split(' ')[0] || ''
  const greeting = user.biological_sex === 'M' ? 'Bem-vindo' : 'Bem-vinda'
  const title = user.doctor?.crm ? 'Dr. ' : ''
  const welcomeMessageText = `${greeting}, ${title}${firstName}!`

  return {
    welcomeMessageText,
  }
}
