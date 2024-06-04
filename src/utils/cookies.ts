import Cookies from 'js-cookie'

export const ACCESS_TOKEN_COOKIE_NAME = 'access_token'
export const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token'

export function setAccessToken(token: string) {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, token)
}

export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME)
}

export function removeAccessToken() {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME)
}

export function setRefreshToken(token: string) {
  Cookies.set(REFRESH_TOKEN_COOKIE_NAME, token)
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_TOKEN_COOKIE_NAME)
}

export function removeRefreshToken() {
  Cookies.remove(REFRESH_TOKEN_COOKIE_NAME)
}

export function createCookieWithExpiration(): void {
  const expirationMinutes = 1060
  const expirationSeconds = expirationMinutes * 60
  const expirationDate = Math.floor(Date.now() / 1000) + expirationSeconds

  Cookies.set('tokenExpiration', expirationDate.toString())
}
