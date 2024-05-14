import { render } from '@testing-library/react'
import 'jest-styled-components' // para asserções de estilos
import { Skeleton } from '.'

describe('Skeleton', () => {
  it('renders correctly', () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('has correct animation styles', () => {
    const { container } = render(<Skeleton />)
    const divElement = container.firstChild
    expect(divElement).toHaveStyleRule(
      'animation',
      expect.stringContaining('1s linear infinite alternate'),
    )
  })
})
