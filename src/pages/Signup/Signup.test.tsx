import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Signup } from '.'
import { MemoryRouter } from 'react-router-dom'
import AppProviders from '../../components/AppProviders'

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <AppProviders>{ui}</AppProviders>
    </MemoryRouter>,
  )
}

describe('Signup Component', () => {
  test('renders the signup component', () => {
    renderWithProviders(<Signup />)
    expect(screen.getByTestId('signup-component')).toBeInTheDocument()
  })

  test('navigates to login page when link is clicked', () => {
    renderWithProviders(<Signup />)
    const loginLink = screen.getByTestId('navigate-login')
    fireEvent.click(loginLink)
    expect(window.location.pathname).toBe('/')
  })

  test('displays TypingEffect text correctly', async () => {
    renderWithProviders(<Signup />)
    await waitFor(() => {
      expect(screen.getByTestId('typing-effect-title')).toBeInTheDocument()
      expect(screen.getByTestId('typing-effect-slogan')).toBeInTheDocument()
    })
  })

  test('loads image successfully', () => {
    renderWithProviders(<Signup />)
    const image = screen.getByTestId('signup-image')
    fireEvent.load(image)
    expect(image).toBeVisible()
  })

  test('shows skeleton loader when image is not loaded', () => {
    renderWithProviders(<Signup />)
    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })
})
