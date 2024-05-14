import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { PrimaryButton } from './index'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

describe('PrimaryButton Component', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('renders with children text', () => {
    renderWithTheme(<PrimaryButton>Click me</PrimaryButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('applies primary styles by default', () => {
    renderWithTheme(<PrimaryButton>Primary</PrimaryButton>)
    const button = screen.getByText('Primary')
    expect(button).toHaveStyle(
      `background-color: ${defaultTheme.colors.blue500}`,
    )
  })

  it('applies secondary styles when variant is secondary', () => {
    renderWithTheme(
      <PrimaryButton variant="secondary">Secondary</PrimaryButton>,
    )
    const button = screen.getByText('Secondary')
    expect(button).toHaveStyle('background-color: inherit')
    expect(button).toHaveStyle(`color: ${defaultTheme.colors.neutral600}`)
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    renderWithTheme(
      <PrimaryButton onClick={handleClick}>Click me</PrimaryButton>,
    )
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    renderWithTheme(<PrimaryButton disabled>Disabled</PrimaryButton>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })
})
