import { ToastOptions, toast } from 'react-toastify'
import * as CONSTANTS from './constants'

export function ErrorToast(texto: string, customConfig = {}) {
  toast.error(texto, {
    ...CONSTANTS.TOAST_BASIC_CONFIGURATIONS,
    ...customConfig,
  } as ToastOptions)
}

export function SuccessToast(texto: string, customConfig = {}) {
  toast.success(texto, {
    ...CONSTANTS.TOAST_BASIC_CONFIGURATIONS,
    ...customConfig,
  } as ToastOptions)
}

export function InfoToast(texto: string, customConfig = {}) {
  toast.info(texto, {
    ...CONSTANTS.TOAST_BASIC_CONFIGURATIONS,
    ...customConfig,
  } as ToastOptions)
}
