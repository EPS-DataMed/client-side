import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AddDependentDialog } from '.'
import { useForm, useController } from 'react-hook-form'
import { useUserContext } from '../../../../contexts/UserContext'
import { useSubmitDependent } from './hooks/useSubmitDependent'
import useNavigation from '../../../../hooks/useNavigation'
import AppProviders from '../../../../components/AppProviders'

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
  useForm: jest.fn(),
  useController: jest.fn(),
}))

jest.mock('../../../../contexts/UserContext', () => ({
  useUserContext: jest.fn(),
}))

jest.mock('./hooks/useSubmitDependent', () => ({
  useSubmitDependent: jest.fn(),
}))

jest.mock('../../../../hooks/useNavigation', () => jest.fn())

const mockedUseForm = useForm as jest.Mock
const mockedUseController = useController as jest.Mock
const mockedUseUserContext = useUserContext as jest.Mock
const mockedUseSubmitDependent = useSubmitDependent as jest.Mock
const mockedUseNavigation = useNavigation as jest.Mock

describe('AddDependentDialog', () => {
  beforeEach(() => {
    mockedUseForm.mockReturnValue({
      control: {},
      handleSubmit: (fn: any) => (e: any) => {
        e.preventDefault()
        return fn()
      },
    })
    mockedUseController.mockReturnValue({
      field: {
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
      },
      fieldState: { error: undefined },
    })
    mockedUseUserContext.mockReturnValue({ isDoctor: false })
    mockedUseSubmitDependent.mockReturnValue({
      loading: false,
      onSubmit: jest.fn(),
    })
    mockedUseNavigation.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the form elements correctly', () => {
    render(
      <AppProviders>
        <AddDependentDialog onCloseDialog={jest.fn()} />
      </AppProviders>,
    )

    expect(screen.getByTestId('input-email')).toBeInTheDocument()
    expect(screen.getByTestId('message-area')).toBeInTheDocument()
    expect(screen.getByTestId('back-button')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('calls onCloseDialog when back button is clicked', () => {
    const onCloseDialog = jest.fn()
    render(
      <AppProviders>
        <AddDependentDialog onCloseDialog={onCloseDialog} />
      </AppProviders>,
    )

    fireEvent.click(screen.getByTestId('back-button'))
    expect(onCloseDialog).toHaveBeenCalled()
  })

  it('calls navigateTo when signup link is clicked', () => {
    const navigateTo = jest.fn()
    mockedUseNavigation.mockReturnValue(navigateTo)

    render(
      <AppProviders>
        <AddDependentDialog onCloseDialog={jest.fn()} />
      </AppProviders>,
    )

    fireEvent.click(screen.getByTestId('signup-link'))
    expect(navigateTo).toHaveBeenCalledWith('/signup')
  })

  it('displays loading spinner when submitting', async () => {
    mockedUseSubmitDependent.mockReturnValue({
      loading: true,
      onSubmit: jest.fn(),
    })

    render(
      <AppProviders>
        <AddDependentDialog onCloseDialog={jest.fn()} />
      </AppProviders>,
    )

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument()
    })
  })

  it('calls onSubmit when form is submitted', () => {
    const onSubmit = jest.fn()
    mockedUseSubmitDependent.mockReturnValue({
      loading: false,
      onSubmit,
    })

    render(
      <AppProviders>
        <AddDependentDialog onCloseDialog={jest.fn()} />
      </AppProviders>,
    )

    fireEvent.submit(screen.getByTestId('add-dependent-form'))
    expect(onSubmit).toHaveBeenCalled()
  })
})
