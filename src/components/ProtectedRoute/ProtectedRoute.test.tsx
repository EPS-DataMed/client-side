import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/cookies'
import ProtectedRoute from '.'

jest.mock('../../utils/cookies')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('ProtectedRoute Component', () => {
  const useNavigateMock = useNavigate as jest.Mock
  const getCookieMock = getCookie as jest.Mock

  beforeEach(() => {
    useNavigateMock.mockClear()
    getCookieMock.mockClear()
  })

  it('redirects to home if no token is present', () => {
    getCookieMock.mockReturnValue(null)
    const navigate = jest.fn()
    useNavigateMock.mockReturnValue(navigate)

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('renders children if token is present', () => {
    getCookieMock.mockReturnValue('valid-token')
    const navigate = jest.fn()
    useNavigateMock.mockReturnValue(navigate)

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(getByText('Protected Content')).toBeInTheDocument()
    expect(navigate).not.toHaveBeenCalled()
  })

  it('renders null if no token is present', () => {
    getCookieMock.mockReturnValue(null)
    const navigate = jest.fn()
    useNavigateMock.mockReturnValue(navigate)

    const { queryByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>,
    )

    expect(queryByText('Protected Content')).toBeNull()
  })
})
