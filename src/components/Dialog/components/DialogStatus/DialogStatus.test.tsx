import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { DialogStatus } from '.'
import { defaultTheme } from '../../../../styles/themes/default'

jest.mock('lottie-react', () => ({
  __esModule: true,
  default: () => <div data-testid="animated-check-icon" />,
}))

describe('DialogStatus Component', () => {
  const setup = () => {
    return render(
      <ThemeProvider theme={defaultTheme}>
        <div data-testid="root-container">
          <DialogStatus.ErrorDialogIcon data-testid="error-icon" />
          <DialogStatus.Title>Test Title</DialogStatus.Title>
          <DialogStatus.Description>Test Description</DialogStatus.Description>
          <DialogStatus.AnimatedCheckIcon />
        </div>
      </ThemeProvider>,
    )
  }

  it('renders the root container', () => {
    setup()
    expect(screen.getByTestId('root-container')).toBeInTheDocument()
  })

  it('renders the title with correct text', () => {
    setup()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders the description with correct text', () => {
    setup()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('renders the ErrorDialogIcon', () => {
    setup()
    expect(screen.getByTestId('error-icon')).toBeInTheDocument()
  })

  it('renders the AnimatedCheckIcon', () => {
    setup()
    expect(screen.getByTestId('animated-check-icon')).toBeInTheDocument()
  })
})
