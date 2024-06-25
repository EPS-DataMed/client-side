import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RecoverPassword } from '.'
import AppProviders from '../../components/AppProviders'
import { useForgotPassword } from './hooks/useForgotPassword'
import useNavigation from '../../hooks/useNavigation'

// Mock the useForgotPassword hook
jest.mock('./hooks/useForgotPassword')

// Mock the useNavigation hook
jest.mock('../../hooks/useNavigation')

const mockUseForgotPassword = useForgotPassword as jest.MockedFunction<
  typeof useForgotPassword
>
const mockUseNavigation = useNavigation as jest.MockedFunction<
  typeof useNavigation
>

const renderComponent = () => {
  render(
    <Router>
      <AppProviders>
        <RecoverPassword />
      </AppProviders>
    </Router>,
  )
}

describe('RecoverPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should display loading skeleton while image is loading', () => {
    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: jest.fn(),
      loading: false,
    })

    renderComponent()

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  test('should display image when loaded', async () => {
    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: jest.fn(),
      loading: false,
    })

    renderComponent()

    const image = screen.getByTestId('page-image')

    // Simulate image load event
    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toHaveStyle('display: block')
    })
  })

  test('should hide image if not loaded', async () => {
    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: jest.fn(),
      loading: false,
    })

    renderComponent()

    const image = screen.getByTestId('page-image')

    await waitFor(() => {
      expect(image).toHaveStyle('display: none')
    })
  })

  test('should submit form with email', async () => {
    const mockSubmitForgotPassword = jest.fn()

    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: mockSubmitForgotPassword,
      loading: false,
    })

    renderComponent()

    const emailInput = screen
      .getByTestId('input-email')
      .querySelector('input') as HTMLInputElement
    const submitButton = screen.getByTestId('submit-button')

    expect(emailInput).not.toBeNull() // Ensure emailInput is not null
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmitForgotPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      })
    })
  })

  test('should show loading spinner while submitting', () => {
    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: jest.fn(),
      loading: true,
    })

    renderComponent()

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('should navigate to login on link click', () => {
    const mockNavigate = jest.fn()
    mockUseNavigation.mockReturnValue(mockNavigate)

    mockUseForgotPassword.mockReturnValue({
      submitForgotPassword: jest.fn(),
      loading: false,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('login-link'))

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
