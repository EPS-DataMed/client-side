import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { Spinner } from './' // Ajuste o caminho conforme necessário
import { defaultTheme } from '../../styles/themes/default'

describe('Spinner Component', () => {
  it('should render the spinner component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Spinner />
      </ThemeProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
