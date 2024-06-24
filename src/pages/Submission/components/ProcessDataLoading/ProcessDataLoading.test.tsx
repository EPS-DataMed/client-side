import { render, screen, waitFor } from '@testing-library/react'
import { ProcessDataLoading } from '.'
import AppProviders from '../../../../components/AppProviders'

jest.mock('lottie-react', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="lottie-animation" />),
}))

jest.mock('./styles', () => ({
  Container: (props: any) => <div {...props} />,
  WrapperLottie: (props: any) => <div {...props} />,
  MessageLoading: (props: any) => <div {...props} />,
}))

describe('ProcessDataLoading', () => {
  jest.useFakeTimers()

  const renderComponent = () => {
    render(
      <AppProviders>
        <ProcessDataLoading />
      </AppProviders>,
    )
  }

  it('renders correctly', () => {
    renderComponent()

    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument()
    expect(screen.getByText('Processando dados, aguarde')).toBeInTheDocument()
  })

  it('changes messages over time', async () => {
    renderComponent()

    const messages = [
      'Processando dados, aguarde',
      'Pode demorar um pouco',
      'Enquanto isso, que tal ir beber uma água?',
      'Aproveite para esticar as pernas!',
      'Estamos quase lá, só mais um pouco!',
      'Que tal verificar seus e-mails enquanto isso?',
      'Tempo para um café rápido?',
    ]

    for (let i = 0; i < messages.length; i++) {
      expect(screen.getByText(messages[i])).toBeInTheDocument()
      jest.advanceTimersByTime(3000)
      await waitFor(() =>
        expect(screen.queryByText(messages[i])).not.toBeInTheDocument(),
      )
    }
  })

  it('handles fade transitions correctly', async () => {
    renderComponent()

    expect(screen.getByText('Processando dados, aguarde')).toHaveAttribute(
      'fade',
      'in',
    )

    jest.advanceTimersByTime(3000)
    await waitFor(() =>
      expect(screen.getByText('Pode demorar um pouco')).toHaveAttribute(
        'fade',
        'in',
      ),
    )
  })
})
