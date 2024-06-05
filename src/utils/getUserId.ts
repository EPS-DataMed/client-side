import { decodeJwt } from '../pages/Login/utils'
import { getCookie } from './cookies'

interface DecodedToken {
  user_id: number
}

export function getUserId(): { userId: number | null } {
  try {
    const token = getCookie('access_token')
    if (!token) {
      return { userId: null }
    }

    const decodedToken: DecodedToken | null = decodeJwt(token)

    if (!decodedToken || !decodedToken.user_id) {
      return { userId: null }
    }

    return { userId: decodedToken.user_id }
  } catch (error) {
    return { userId: null }
  }
}
