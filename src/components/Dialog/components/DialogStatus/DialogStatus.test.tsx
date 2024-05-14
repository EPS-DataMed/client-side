import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { DialogStatus } from './'
import { defaultTheme } from '../../../../styles/themes/default'

// Mock Lottie component
// eslint-disable-next-line react/display-name
jest.mock('lottie-react', () => () => <div data-testid="mock-lottie" />)

describe('DialogStatus Styled Components', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('Root component has correct styles', () => {
    const { container } = renderWithTheme(<DialogStatus.Root />)
    expect(container.firstChild).toHaveStyleRule('display', 'flex')
    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')
    expect(container.firstChild).toHaveStyleRule('width', '268px')
    expect(container.firstChild).toHaveStyleRule('align-items', 'center')
    expect(container.firstChild).toHaveStyleRule('justify-content', 'center')
  })

  it('Title component has correct styles', () => {
    const { container } = renderWithTheme(<DialogStatus.Title />)
    expect(container.firstChild).toHaveStyleRule('position', 'relative')
    expect(container.firstChild).toHaveStyleRule('bottom', '10px')
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral700,
    )
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes['2xl'],
    )

    expect(container.firstChild).toHaveStyleRule('text-align', 'center')
    expect(container.firstChild).toHaveStyleRule(
      'font-weight',
      defaultTheme.fontWeights.regular,
    )
    expect(container.firstChild).toHaveStyleRule('margin', '0')
  })

  it('Description component has correct styles', () => {
    const { container } = renderWithTheme(<DialogStatus.Description />)
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral900,
    )
    expect(container.firstChild).toHaveStyleRule('position', 'relative')
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes.sm,
    )

    expect(container.firstChild).toHaveStyleRule('text-align', 'center')
  })

  it('ErrorDialogIcon component has correct styles', () => {
    const { container } = renderWithTheme(<DialogStatus.ErrorDialogIcon />)
    expect(container.firstChild).toHaveStyleRule('width', '84px')
    expect(container.firstChild).toHaveStyleRule('height', '84px')
  })

  it('renders AnimatedCheckIcon component', () => {
    const { container } = renderWithTheme(<DialogStatus.AnimatedCheckIcon />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
