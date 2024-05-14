import { render } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import { Input } from './'
import { defaultTheme } from '../../styles/themes/default'

describe('Input Component', () => {
  it('should render the input component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.Input />
      </ThemeProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should apply error styles when hasError is true', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.Input hasError={true} placeholder="Test input" />
      </ThemeProvider>,
    )
    const input = getByPlaceholderText('Test input')
    expect(input).toHaveStyleRule(
      'border',
      `1px solid ${defaultTheme.colors.red500}`,
    )
  })

  it('should apply searchbar styles when variant is searchbar', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.Input variant="searchbar" placeholder="Search" />
      </ThemeProvider>,
    )
    const input = getByPlaceholderText('Search')
    expect(input).toHaveStyleRule('height', '32px')
    expect(input).toHaveStyleRule('padding-left', '38px')
    expect(input).toHaveStyleRule('padding-right', '38px')
  })

  it('should render the label component', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.Label>Label Text</Input.Label>
      </ThemeProvider>,
    )
    expect(getByText('Label Text')).toBeInTheDocument()
  })

  it('should render the error message component', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.ErrorMessage>Error Message</Input.ErrorMessage>
      </ThemeProvider>,
    )
    expect(getByText('Error Message')).toBeInTheDocument()
  })

  it('should render the description component', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.Description>Description Text</Input.Description>
      </ThemeProvider>,
    )
    expect(getByText('Description Text')).toBeInTheDocument()
  })

  it('should apply error styles to RequiredText when variant is error', () => {
    const { getByText } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.RequiredText variant="error">Required Text</Input.RequiredText>
      </ThemeProvider>,
    )
    expect(getByText('Required Text')).toHaveStyleRule(
      'color',
      defaultTheme.colors.red500,
    )
  })

  it('should render the error message root component', () => {
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <Input.ErrorMessageRoot>
          <span>Error Icon</span>
          <Input.ErrorMessage>Error Message</Input.ErrorMessage>
        </Input.ErrorMessageRoot>
      </ThemeProvider>,
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
