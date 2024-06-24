import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from '.'
import { login } from './services'
import { saveCookie } from '../../utils/cookies'
import { ErrorToast } from '../../components/Toast'
import { BrowserRouter } from 'react-router-dom'
import AppProviders from '../../components/AppProviders'

jest.mock('./services')
jest.mock('../../utils/cookies')
jest.mock('../../components/Toast')

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AppProviders>{ui}</AppProviders>
    </BrowserRouter>,
  )
}

const mockedLogin = login as jest.Mock

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders login component', () => {
    renderWithProviders(<Login />)
    expect(screen.getByTestId('login-background')).toBeInTheDocument()
    expect(screen.getByTestId('login-skeleton')).toBeInTheDocument()
  })

  test('loads image and hides skeleton', async () => {
    renderWithProviders(<Login />)
    const image = screen.getByTestId('login-image')

    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toBeVisible()
      expect(screen.queryByTestId('login-skeleton')).not.toBeInTheDocument()
    })
  })

  test('handles successful login', async () => {
    mockedLogin.mockResolvedValue({ content: { access_token: 'test-token' } })
    renderWithProviders(<Login />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      })
      expect(saveCookie).toHaveBeenCalledWith('access_token', 'test-token', 30)
    })
  })

  test('handles login failure', async () => {
    mockedLogin.mockRejectedValue(new Error('Login failed'))
    renderWithProviders(<Login />)

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: 'password' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(ErrorToast).toHaveBeenCalledWith('Verifique suas credenciais!')
    })
  })

  test('navigates to recover password page', () => {
    renderWithProviders(<Login />)
    fireEvent.click(screen.getByTestId('forgot-password-link'))
    expect(window.location.pathname).toBe('/recover')
  })

  test('navigates to signup page', () => {
    renderWithProviders(<Login />)
    fireEvent.click(screen.getByTestId('signup-link'))
    expect(window.location.pathname).toBe('/signup')
  })
})
