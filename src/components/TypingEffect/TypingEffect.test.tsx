import { render, screen, waitFor } from '@testing-library/react'
import TypingEffect from '.'

describe('TypingEffect Component', () => {
  jest.useFakeTimers()

  it('renders the initial empty text', () => {
    render(<TypingEffect text="Hello, world!" dataTestId="typing-effect" />)
    expect(screen.getByTestId('typing-effect')).toHaveTextContent('')
  })

  it('displays text gradually', async () => {
    const text = 'Hello, world!'
    render(<TypingEffect text={text} dataTestId="typing-effect" />)

    for (let i = 0; i <= text.length; i++) {
      jest.advanceTimersByTime(100)
      await waitFor(() => {
        expect(screen.getByTestId('typing-effect')).toHaveTextContent(
          text.slice(0, i),
        )
      })
    }
  })

  it('clears the interval on unmount', () => {
    const { unmount } = render(
      <TypingEffect text="Hello, world!" dataTestId="typing-effect" />,
    )
    unmount()
    jest.advanceTimersByTime(1000)
  })
})
