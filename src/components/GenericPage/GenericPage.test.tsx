import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { GenericPage } from './'
import { defaultTheme } from '../../styles/themes/default'

describe('GenericPage Styled Components', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('Root component has correct styles', () => {
    const { container } = renderWithTheme(<GenericPage.Root />)
    expect(container.firstChild).toHaveStyleRule('display', 'flex')
    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column')
    expect(container.firstChild).toHaveStyleRule('flex', '1')
    expect(container.firstChild).toHaveStyleRule(
      'padding',
      `${defaultTheme.space[19]} ${defaultTheme.space[27]}`,
    )
    expect(container.firstChild).toHaveStyleRule('height', '100vh')
  })

  it('Divider component has correct styles', () => {
    const { container } = renderWithTheme(<GenericPage.Divider />)
    expect(container.firstChild).toHaveStyleRule('width', '100%')
    expect(container.firstChild).toHaveStyleRule('height', '0.5px')
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      defaultTheme.colors.neutral400,
    )
  })

  it('Title component has correct styles', () => {
    const { container } = renderWithTheme(<GenericPage.Title />)
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes['5xl'],
    )
    expect(container.firstChild).toHaveStyleRule('font-weight', 'bold')
  })

  it('Description component has correct styles', () => {
    const { container } = renderWithTheme(<GenericPage.Description />)
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes.md,
    )
  })

  it('LogoTitle component has correct styles', () => {
    const { container } = renderWithTheme(<GenericPage.LogoTitle />)
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes.lg,
    )
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.blue500,
    )
  })
})
