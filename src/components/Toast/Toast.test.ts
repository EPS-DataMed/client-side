import { toast } from 'react-toastify'
import { ErrorToast, SuccessToast, InfoToast } from './'
import * as CONSTANTS from './constants'

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}))

describe('Toast Functions', () => {
  const defaultConfig = CONSTANTS.TOAST_BASIC_CONFIGURATIONS

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call toast.error with the correct arguments for ErrorToast', () => {
    const message = 'Error message'
    const customConfig = { autoClose: 5000 }

    ErrorToast(message, customConfig)

    expect(toast.error).toHaveBeenCalledWith(message, {
      ...defaultConfig,
      ...customConfig,
    })
  })

  it('should call toast.success with the correct arguments for SuccessToast', () => {
    const message = 'Success message'
    const customConfig = { autoClose: 3000 }

    SuccessToast(message, customConfig)

    expect(toast.success).toHaveBeenCalledWith(message, {
      ...defaultConfig,
      ...customConfig,
    })
  })

  it('should call toast.info with the correct arguments for InfoToast', () => {
    const message = 'Info message'
    const customConfig = { autoClose: 2000 }

    InfoToast(message, customConfig)

    expect(toast.info).toHaveBeenCalledWith(message, {
      ...defaultConfig,
      ...customConfig,
    })
  })

  it('should call toast.error with default config if no custom config is provided for ErrorToast', () => {
    const message = 'Error message'

    ErrorToast(message)

    expect(toast.error).toHaveBeenCalledWith(message, defaultConfig)
  })

  it('should call toast.success with default config if no custom config is provided for SuccessToast', () => {
    const message = 'Success message'

    SuccessToast(message)

    expect(toast.success).toHaveBeenCalledWith(message, defaultConfig)
  })

  it('should call toast.info with default config if no custom config is provided for InfoToast', () => {
    const message = 'Info message'

    InfoToast(message)

    expect(toast.info).toHaveBeenCalledWith(message, defaultConfig)
  })
})
