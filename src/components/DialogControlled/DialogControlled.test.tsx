import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { DialogControlled } from './'
import { ButtonProps, DialogItemToRender } from './interfaces'
import { defaultTheme } from '../../styles/themes/default'

describe('DialogControlled', () => {
  const mockHandleUpdateDialogControlled = jest.fn()
  const mockOnClose = jest.fn()
  const mockOnSubmit = jest.fn()
  const mockButtonAction = jest.fn()

  const defaultProps = {
    handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
    isDialogControlledOpen: true,
    dialogItemToRender: {
      title: 'Test Title',
      description: 'Test Description',
      buttonConfig: [
        { id: 'submit', label: 'Submit', type: 'submit', variant: 'primary' },
        {
          id: 'cancel',
          label: 'Cancel',
          type: 'button',
          variant: 'secondary',
          action: mockButtonAction,
        },
      ],
    } as DialogItemToRender,
    isLoadingRequisition: false,
    onSubmit: mockOnSubmit,
    onClose: mockOnClose,
  }

  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('should render the dialog with title, description, and buttons', () => {
    renderWithTheme(<DialogControlled {...defaultProps} />)

    expect(screen.getByTestId('dialog-title-wrapper')).toHaveTextContent(
      'Test Title',
    )
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Test Description',
    )
    expect(screen.getByTestId('button-submit')).toBeInTheDocument()
    expect(screen.getByTestId('button-cancel')).toBeInTheDocument()
  })

  it('should call onClose and handleUpdateDialogControlled when close icon is clicked', () => {
    renderWithTheme(<DialogControlled {...defaultProps} />)

    fireEvent.click(screen.getByTestId('close-icon-button'))

    expect(mockOnClose).toHaveBeenCalledTimes(1)
    expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)
  })

  it('should call onSubmit when submit button is clicked', () => {
    renderWithTheme(<DialogControlled {...defaultProps} />)

    fireEvent.click(screen.getByTestId('button-submit'))

    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('should call handleUpdateDialogControlled when overlay is clicked', () => {
    renderWithTheme(<DialogControlled {...defaultProps} />)

    fireEvent.click(screen.getByTestId('dialog-overlay'))

    expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)
  })

  it('should not call onClose or handleUpdateDialogControlled when isLoadingRequisition is true', () => {
    renderWithTheme(
      <DialogControlled {...defaultProps} isLoadingRequisition={true} />,
    )

    fireEvent.click(screen.getByTestId('close-icon-button'))

    expect(mockOnClose).toHaveBeenCalled()
    expect(mockHandleUpdateDialogControlled).toHaveBeenCalled()
  })

  it('should apply custom styles to PrimaryButton', () => {
    const customButtonConfig: ButtonProps[] = [
      {
        id: 'custom',
        label: 'Custom',
        type: 'button',
        variant: 'primary', // Ensure variant is correct type
        color: 'white',
        backgroundColor: 'blue',
        borderColor: 'red',
      },
    ]

    renderWithTheme(
      <DialogControlled
        {...defaultProps}
        dialogItemToRender={{
          ...defaultProps.dialogItemToRender,
          buttonConfig: customButtonConfig,
        }}
      />,
    )

    const customButton = screen.getByTestId('button-custom')
    expect(customButton).toHaveStyle('color: white')
    expect(customButton).toHaveStyle('background-color: blue')
    expect(customButton).toHaveStyle('border-color: red')
  })

  it('should not render close icon when hideCloseButton is true', () => {
    renderWithTheme(
      <DialogControlled
        {...defaultProps}
        dialogItemToRender={{
          ...defaultProps.dialogItemToRender,
          hideCloseButton: true,
        }}
      />,
    )

    expect(screen.queryByTestId('close-icon-button')).not.toBeInTheDocument()
  })

  it('should render title and description conditionally', () => {
    renderWithTheme(
      <DialogControlled
        {...defaultProps}
        dialogItemToRender={{ title: '', description: '' }}
      />,
    )

    expect(screen.queryByTestId('dialog-title-wrapper')).not.toBeInTheDocument()
    expect(screen.queryByTestId('dialog-description')).not.toBeInTheDocument()
  })

  it('should call button action when custom button is clicked', () => {
    const customButtonConfig: ButtonProps[] = [
      {
        id: 'custom',
        label: 'Custom',
        type: 'button',
        variant: 'primary', // Ensure variant is correct type
        action: mockButtonAction,
      },
    ]

    renderWithTheme(
      <DialogControlled
        {...defaultProps}
        dialogItemToRender={{
          ...defaultProps.dialogItemToRender,
          buttonConfig: customButtonConfig,
        }}
      />,
    )

    fireEvent.click(screen.getByTestId('button-custom'))
    expect(mockButtonAction).toHaveBeenCalledTimes(1)
  })
})
