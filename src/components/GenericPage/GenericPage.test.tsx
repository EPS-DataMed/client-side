import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { GenericPage } from '.'
import { defaultTheme } from '../../styles/themes/default'
import useNavigation from '../../hooks/useNavigation'

jest.mock('../../hooks/useNavigation')

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>)
}

describe('GenericPage Components', () => {
  const navigateToMock = jest.fn()

  beforeEach(() => {
    ;(useNavigation as jest.Mock).mockReturnValue(navigateToMock)

    jest.clearAllMocks()
  })

  it('renders Root component with correct styles', () => {
    renderWithTheme(
      <GenericPage.Root hasNoScrollbar data-testid="root-component" />,
    )
    const rootElement = screen.getByTestId('root-component')
    expect(rootElement).toHaveStyle('display: flex')
    expect(rootElement).toHaveStyle('flex-direction: column')
    expect(rootElement).toHaveStyle('flex: 1')
    expect(rootElement).toHaveStyle('height: 100vh')
  })

  it('renders Header component', () => {
    renderWithTheme(<GenericPage.Header data-testid="header-component" />)
    const headerElement = screen.getByTestId('header-component')
    expect(headerElement).toHaveStyle('display: flex')
    expect(headerElement).toHaveStyle('justify-content: space-between')
  })

  it('renders HeaderOptions component with correct gap', () => {
    renderWithTheme(
      <GenericPage.HeaderOptions data-testid="header-options-component" />,
    )
    const headerOptionsElement = screen.getByTestId('header-options-component')
    expect(headerOptionsElement).toHaveStyle(`gap: ${defaultTheme.space[4]}`)
  })

  it('renders Divider component with correct styles', () => {
    renderWithTheme(<GenericPage.Divider data-testid="divider-component" />)
    const dividerElement = screen.getByTestId('divider-component')
    expect(dividerElement).toHaveStyle('width: 100%')
    expect(dividerElement).toHaveStyle('height: 0.5px')
    expect(dividerElement).toHaveStyle(
      `background-color: ${defaultTheme.colors.neutral400}`,
    )
  })

  it('renders Title component with correct text and styles', () => {
    renderWithTheme(<GenericPage.Title>Test Title</GenericPage.Title>)
    const titleElement = screen.getByText('Test Title')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveStyle(
      `font-size: ${defaultTheme.fontSizes['5xl']}`,
    )
    expect(titleElement).toHaveStyle('font-weight: bold')
  })

  it('renders Description component with correct text and styles', () => {
    renderWithTheme(
      <GenericPage.Description>Test Description</GenericPage.Description>,
    )
    const descriptionElement = screen.getByText('Test Description')
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveStyle(
      `font-size: ${defaultTheme.fontSizes.md}`,
    )
    expect(descriptionElement).toHaveStyle('text-align: justify')
  })

  it('navigates to /home when CustomLogoSVG is clicked', () => {
    renderWithTheme(<GenericPage.Logo data-testid="logo-icon" />)
    const logoElement = screen.getByTestId('logo-icon')
    fireEvent.click(logoElement)
    expect(navigateToMock).toHaveBeenCalledWith('/home')
  })

  it('navigates to /home when LogoTitleComponent is clicked', () => {
    renderWithTheme(
      <GenericPage.LogoTitle>Test Logo Title</GenericPage.LogoTitle>,
    )
    const logoTitleElement = screen.getByText('Test Logo Title')
    fireEvent.click(logoTitleElement)
    expect(navigateToMock).toHaveBeenCalledWith('/home')
  })

  it('renders LogoutButton and calls action on click', () => {
    const actionMock = jest.fn()
    renderWithTheme(<GenericPage.LogoutButton action={actionMock} />)

    const logoutButton = screen.getByRole('button')
    fireEvent.click(logoutButton)
    expect(actionMock).toHaveBeenCalled()
  })
})
