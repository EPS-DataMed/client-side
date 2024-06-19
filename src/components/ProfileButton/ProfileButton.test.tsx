import { render, screen, fireEvent } from '@testing-library/react'
import { ProfileButton } from '.'
import { useUserContext } from '../../contexts/UserContext'
import useNavigation from '../../hooks/useNavigation'
import { listUserInfoRepository } from './repositories/listUserInfoRepository'
import AppProviders from '../AppProviders'

// Mocking dependencies
jest.mock('../../contexts/UserContext')
jest.mock('../../hooks/useNavigation')
jest.mock('./repositories/listUserInfoRepository')

const mockUseUserContext = useUserContext as jest.Mock
const mockUseNavigation = useNavigation as jest.Mock
const mockListUserInfoRepository = listUserInfoRepository as jest.Mock

describe('ProfileButton', () => {
  beforeEach(() => {
    mockUseUserContext.mockReturnValue({ user: { full_name: 'John Doe' } })
    mockUseNavigation.mockReturnValue(jest.fn())
    mockListUserInfoRepository.mockReturnValue({ isListUserInfoLoading: false })
  })

  it('should render the component', () => {
    render(
      <AppProviders>
        <ProfileButton />
      </AppProviders>,
    )
    const button = screen.getByTestId('profile-button')
    expect(button).toBeInTheDocument()
  })

  it('should navigate to /editUser when clicked', () => {
    const navigateTo = jest.fn()
    mockUseNavigation.mockReturnValue(navigateTo)

    render(
      <AppProviders>
        <ProfileButton />
      </AppProviders>,
    )

    const button = screen.getByTestId('profile-button')
    fireEvent.click(button)

    expect(navigateTo).toHaveBeenCalledWith('/editUser')
  })

  it('should display the user initial when user exists and not loading', () => {
    render(
      <AppProviders>
        <ProfileButton />
      </AppProviders>,
    )
    const userInitial = screen.getByText('J')
    expect(userInitial).toBeInTheDocument()
  })

  it('should display the skeleton when loading user info', () => {
    mockListUserInfoRepository.mockReturnValueOnce({
      isListUserInfoLoading: true,
    })

    render(
      <AppProviders>
        <ProfileButton />
      </AppProviders>,
    )
    const skeleton = screen.getByTestId('skeleton-profile-circle')
    expect(skeleton).toBeInTheDocument()
  })

  it('should display the skeleton when user does not exist', () => {
    mockUseUserContext.mockReturnValueOnce({ user: null })

    render(
      <AppProviders>
        <ProfileButton />
      </AppProviders>,
    )
    const skeleton = screen.getByTestId('skeleton-profile-circle')
    expect(skeleton).toBeInTheDocument()
  })
})
