import React from 'react'
import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { Dialog } from './'
import { defaultTheme } from '../../styles/themes/default'

describe('Dialog Styled Components', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>,
    )
  }

  it('Overlay component has correct styles', () => {
    const { container } = renderWithTheme(
      <Dialog.Root open>
        <Dialog.Overlay />
      </Dialog.Root>,
    )
    expect(container.firstChild).toHaveStyleRule('position', 'fixed')
    expect(container.firstChild).toHaveStyleRule('width', '100vw')
    expect(container.firstChild).toHaveStyleRule('height', '100vh')
    expect(container.firstChild).toHaveStyleRule('inset', '0')
    expect(container.firstChild).toHaveStyleRule(
      'background-color',
      'rgba(217, 217, 217, 0.4)',
    )
    expect(container.firstChild).toHaveStyleRule('z-index', '999998')
  })

  it('Content component has correct styles', () => {
    const { container } = renderWithTheme(
      <Dialog.Root open>
        <Dialog.Content />
      </Dialog.Root>,
    )
    expect(container.firstChild).toHaveStyleRule(
      'border-radius',
      defaultTheme.radii.md,
    )
    expect(container.firstChild).toHaveStyleRule(
      'padding',
      defaultTheme.space[6],
    )
    expect(container.firstChild).toHaveStyleRule(
      'background',
      defaultTheme.colors.neutral,
    )
    expect(container.firstChild).toHaveStyleRule('position', 'fixed')
    expect(container.firstChild).toHaveStyleRule('top', '50%')
    expect(container.firstChild).toHaveStyleRule('left', '50%')
    expect(container.firstChild).toHaveStyleRule(
      'transform',
      'translate(-50%, -50%)',
    )
    expect(container.firstChild).toHaveStyleRule('z-index', '999999')
  })

  it('Title component has correct styles', () => {
    const { container } = renderWithTheme(
      <Dialog.Root open>
        <Dialog.Title />
      </Dialog.Root>,
    )
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral900,
    )
    expect(container.firstChild).toHaveStyleRule(
      'font-size',
      defaultTheme.fontSizes.xl,
    )
    expect(container.firstChild).toHaveStyleRule(
      'font-weight',
      defaultTheme.fontWeights.bold,
    )
    expect(container.firstChild).toHaveStyleRule('margin', '0')
  })

  it('Description component has correct styles', () => {
    const { container } = renderWithTheme(
      <Dialog.Root open>
        <Dialog.Description />
      </Dialog.Root>,
    )

    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral900,
    )
  })

  it('CloseIconButton component has correct styles', () => {
    const { container } = renderWithTheme(
      <Dialog.Root open>
        <Dialog.CloseIconButton />
      </Dialog.Root>,
    )
    expect(container.firstChild).toHaveStyleRule('position', 'absolute')
    expect(container.firstChild).toHaveStyleRule('background', 'transparent')
    expect(container.firstChild).toHaveStyleRule('border', '0')
    expect(container.firstChild).toHaveStyleRule('top', '1.9rem')
    expect(container.firstChild).toHaveStyleRule('right', '1.5rem')
    expect(container.firstChild).toHaveStyleRule('line-height', '0')
    expect(container.firstChild).toHaveStyleRule('cursor', 'pointer')
    expect(container.firstChild).toHaveStyleRule(
      'color',
      defaultTheme.colors.neutral900,
    )
    expect(container.firstChild).toHaveStyleRule('z-index', '100')
  })
})
