/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { DependentConfirm } from '.'
import { useDependentData } from './repositories/useDependentData'
import * as Toast from '../../components/Toast'
import AppProviders from '../../components/AppProviders'

jest.mock('./repositories/useDependentData')

jest.spyOn(Toast, 'ErrorToast').mockImplementation(() => undefined)
jest.spyOn(Toast, 'SuccessToast').mockImplementation(() => undefined)

const mockUseDependentData = useDependentData as jest.MockedFunction<
  typeof useDependentData
>

const renderComponent = () => {
  render(
    <Router>
      <AppProviders>
        <DependentConfirm />
      </AppProviders>
    </Router>,
  )
}

describe('DependentConfirm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should display loading skeleton while loading', () => {
    mockUseDependentData.mockReturnValue({
      user: undefined,
      isUserLoading: true,
      isUserError: false,
      handleConfirmDependent: jest.fn(),
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    expect(screen.getByTestId('skeleton-message')).toBeInTheDocument()
  })

  test('should display user details and buttons when data is loaded', () => {
    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: jest.fn(),
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    expect(
      screen.getByText('Confirme se você é um paciente de John Doe.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Não sou')).toBeInTheDocument()
    expect(screen.getByText('Sou')).toBeInTheDocument()
  })

  test('should call handleConfirmDependent with false when "Não sou" is clicked', () => {
    const mockHandleConfirmDependent = jest.fn((confirmed, setLoading) => {
      setLoading(false)
    })

    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: mockHandleConfirmDependent,
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('button-nao-sou'))

    expect(mockHandleConfirmDependent).toHaveBeenCalledWith(
      false,
      expect.any(Function),
    )
  })

  test('should call handleConfirmDependent with true when "Sou" is clicked', () => {
    const mockHandleConfirmDependent = jest.fn((confirmed, setLoading) => {
      setLoading(false)
    })

    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: mockHandleConfirmDependent,
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('button-sou'))

    expect(mockHandleConfirmDependent).toHaveBeenCalledWith(
      true,
      expect.any(Function),
    )
  })

  test('should show success toast on confirm', async () => {
    const mockHandleConfirmDependent = jest.fn((confirmed, setLoading) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        if (confirmed) {
          Toast.SuccessToast('Parabéns você é um paciente de John Doe.')
        } else {
          Toast.SuccessToast('Sua dependência foi negada.')
        }
      }, 500)
    })

    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: mockHandleConfirmDependent,
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('button-sou'))

    await waitFor(() => {
      expect(Toast.SuccessToast).toHaveBeenCalledWith(
        'Parabéns você é um paciente de John Doe.',
      )
    })
  })

  test('should show success toast on deny', async () => {
    const mockHandleConfirmDependent = jest.fn((confirmed, setLoading) => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        if (confirmed) {
          Toast.SuccessToast('Parabéns você é um paciente de John Doe.')
        } else {
          Toast.SuccessToast('Sua dependência foi negada.')
        }
      }, 500)
    })

    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: mockHandleConfirmDependent,
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    fireEvent.click(screen.getByTestId('button-nao-sou'))

    await waitFor(() => {
      expect(Toast.SuccessToast).toHaveBeenCalledWith(
        'Sua dependência foi negada.',
      )
    })
  })

  test('should set imageLoaded to true on image load', async () => {
    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: jest.fn(),
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    const image = screen.getByTestId('page-image')

    fireEvent.load(image)

    await waitFor(() => {
      expect(image).toHaveStyle('display: block')
    })
  })

  test('should hide image if not loaded', async () => {
    mockUseDependentData.mockReturnValue({
      user: {
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        birth_date: '1990-01-01',
        biological_sex: 'Male',
        id: 1,
        creation_date: '2021-01-01',
        password: 'password123',
        doctor: { crm: '12345', specialty: 'Cardiology', user_id: 1 },
      },
      isUserLoading: false,
      isUserError: false,
      handleConfirmDependent: jest.fn(),
      isMutating: false,
      isEmailValid: true,
    })

    renderComponent()

    const image = screen.getByTestId('page-image')

    await waitFor(() => {
      expect(image).toHaveStyle('display: none')
    })
  })
})
