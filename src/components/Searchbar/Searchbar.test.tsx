import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { Searchbar } from './'
import { defaultTheme } from '../../styles/themes/default'

describe('Searchbar Styled Components', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('Root component has correct styles', () => {
    const { container } = renderWithTheme(<Searchbar.Root />)
    expect(container.firstChild).toHaveStyleRule('position', 'relative')
    expect(container.firstChild).toHaveStyleRule('width', '100%')
  })

  it('ScrollContainer component has correct styles based on optionsCount', () => {
    const { container } = renderWithTheme(
      <Searchbar.ScrollContainer optionsCount="fourOrMore" />,
    )
    expect(container.firstChild).toHaveStyleRule('padding', '0px 16px 0 0')
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      defaultTheme.colors.neutral,
    )
    expect(container.firstChild).toHaveStyleRule(
      'border-radius',
      defaultTheme.radii.md,
    )
    expect(container.firstChild).toHaveStyleRule(
      'box-shadow',
      '0px 0px 6px 0px rgba(0, 0, 0, 0.14)',
    )

    const { container: lessThanFourContainer } = renderWithTheme(
      <Searchbar.ScrollContainer optionsCount="lessThanFour" />,
    )
    expect(lessThanFourContainer.firstChild).toHaveStyleRule('padding', '0')
  })

  it('OptionsList component has correct styles based on optionsCount', () => {
    const { container } = renderWithTheme(
      <Searchbar.OptionsList optionsCount="fourOrMore" />,
    )
    expect(container.firstChild).toHaveStyleRule('margin-right', '-20px')
    expect(container.firstChild).toHaveStyleRule('padding-right', '8px')
    expect(container.firstChild).toHaveStyleRule('max-height', '156px')
    expect(container.firstChild).toHaveStyleRule('overflow-y', 'auto')

    const { container: lessThanFourContainer } = renderWithTheme(
      <Searchbar.OptionsList optionsCount="lessThanFour" />,
    )
    expect(lessThanFourContainer.firstChild).not.toHaveStyleRule('margin-right')
    expect(lessThanFourContainer.firstChild).not.toHaveStyleRule(
      'padding-right',
    )
  })

  it('OptionItem component has correct styles based on optionsCount', () => {
    const { container } = renderWithTheme(
      <Searchbar.OptionItem optionsCount="fourOrMore" />,
    )
    expect(container.firstChild).toHaveStyleRule(
      'border-right',
      '1px solid #acacb5',
    )

    const { container: lessThanFourContainer } = renderWithTheme(
      <Searchbar.OptionItem optionsCount="lessThanFour" />,
    )
    expect(lessThanFourContainer.firstChild).not.toHaveStyleRule('border-right')
  })

  it('SearchIconStyled component has correct styles', () => {
    const { container } = renderWithTheme(<Searchbar.SearchIconStyled />)
    expect(container.firstChild).toHaveStyleRule('position', 'absolute')
    expect(container.firstChild).toHaveStyleRule('left', '14px')
    expect(container.firstChild).toHaveStyleRule('top', '9px')
  })

  it('RoundCloseIconStyled component has correct styles', () => {
    const { container } = renderWithTheme(<Searchbar.RoundCloseIconStyled />)
    expect(container.firstChild).toHaveStyleRule('position', 'absolute')
    expect(container.firstChild).toHaveStyleRule('top', '8px')
    expect(container.firstChild).toHaveStyleRule('right', '16px')
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer')
  })

  it('NonBoldText component has correct styles', () => {
    const { container } = renderWithTheme(<Searchbar.NonBoldText />)
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral600,
    )
  })

  it('DeleteIconStyled component renders correctly', () => {
    const { container } = renderWithTheme(<Searchbar.DeleteIconStyled />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
