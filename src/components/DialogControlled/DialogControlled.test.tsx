import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { DialogControlled } from './'
import { defaultTheme } from '../../styles/themes/default'
import { DialogItemToRender } from './interfaces'

const mockHandleUpdateDialogControlled = jest.fn()
const mockOnSubmit = jest.fn()
const mockOnClose = jest.fn()

const dialogItemToRender: DialogItemToRender = {
  title: 'Test Dialog',
  description: 'This is a test dialog',
  buttonConfig: [
    {
      id: 'submit',
      label: 'Submit',
      type: 'submit',
    },
    {
      id: 'cancel',
      label: 'Cancel',
      type: 'button',
      action: mockOnClose,
    },
  ],
}

describe('DialogControlled Component', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('renders the dialog title and description', () => {
    renderWithTheme(
      <DialogControlled
        isDialogControlledOpen={true}
        handleUpdateDialogControlled={mockHandleUpdateDialogControlled}
        dialogItemToRender={dialogItemToRender}
        isLoadingRequisition={false}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />,
    )
    expect(screen.getByText('Test Dialog')).toBeInTheDocument()
    expect(screen.getByText('This is a test dialog')).toBeInTheDocument()
  })

  it('calls onClose when the cancel button is clicked', () => {
    renderWithTheme(
      <DialogControlled
        isDialogControlledOpen={true}
        handleUpdateDialogControlled={mockHandleUpdateDialogControlled}
        dialogItemToRender={dialogItemToRender}
        isLoadingRequisition={false}
        onSubmit={mockOnSubmit}
        onClose={mockOnClose}
      />,
    )
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockOnClose).toHaveBeenCalled()
  })
})
