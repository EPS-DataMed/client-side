import Cookies from 'js-cookie'

export const saveCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, { expires: days })
}

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name)
}
