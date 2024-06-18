import { render, screen, fireEvent } from '@testing-library/react'
import Checkbox, { PrivacyLink } from '.'
import AppProviders from '../AppProviders'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

describe('Checkbox Component', () => {
  const onChangeMock = jest.fn()

  const setup = (checked = false, label = 'Test Label') => {
    return render(
      <AppProviders>
        <Checkbox checked={checked} onChange={onChangeMock} label={label} />
      </AppProviders>,
    )
  }

  it('renders the checkbox with label', () => {
    setup()
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('renders the checkbox as unchecked initially', () => {
    setup(false)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('renders the checkbox as checked when checked prop is true', () => {
    setup(true)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('calls onChange handler when checkbox is clicked', () => {
    setup(false)
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock.mock.calls[0][0].target.checked).toBe(false)
  })

  it('calls onChange handler when label is clicked', () => {
    setup(false)
    const label = screen.getByText('Test Label')
    fireEvent.click(label)
    expect(onChangeMock).toHaveBeenCalledTimes(2)
    expect(onChangeMock.mock.calls[0][0].target.checked).toBe(false)
  })

  it('does not display the checkmark when the checkbox is unchecked', () => {
    setup(false)
    const checkboxIcon = screen.getByTestId('styled-checkbox')
    expect(checkboxIcon).not.toHaveTextContent('✔')
  })

  it('renders the PrivacyLink with correct styles', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PrivacyLink>Privacy Policy</PrivacyLink>
      </ThemeProvider>,
    )
    const link = screen.getByText('Privacy Policy')
    expect(link).toHaveStyle(`color: ${defaultTheme.colors.blue500}`)
    expect(link).toHaveStyle('text-decoration: underline')
    expect(link).toHaveStyle('cursor: pointer')
  })
  it('calls onChange handler when StyledCheckbox is clicked', () => {
    setup(false)
    const styledCheckbox = screen.getByTestId('styled-checkbox')
    fireEvent.click(styledCheckbox)
    expect(onChangeMock).toHaveBeenCalledTimes(3)
    expect(onChangeMock.mock.calls[0][0].target.checked).toBe(false)
  })
})
