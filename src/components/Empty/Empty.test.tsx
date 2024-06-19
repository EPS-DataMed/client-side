import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { Empty } from '.'
import { defaultTheme } from '../../styles/themes/default'
import lottie from 'lottie-web'

jest.mock('lottie-web', () => ({
  __esModule: true,
  default: {
    loadAnimation: jest.fn().mockReturnValue({
      destroy: jest.fn(),
    }),
  },
}))

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>)
}

describe('Empty Component', () => {
  const loadAnimationMock = lottie.loadAnimation as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the text correctly', () => {
    const text = 'No data found'
    renderWithTheme(<Empty text={text} />)
    const notFoundText = screen.getByTestId('not-found-text')
    expect(notFoundText).toBeInTheDocument()
    expect(notFoundText).toHaveTextContent(text)
  })

  it('loads and plays the Lottie animation', () => {
    renderWithTheme(<Empty text="No data found" />)
    expect(loadAnimationMock).toHaveBeenCalledTimes(1)
    expect(loadAnimationMock).toHaveBeenCalledWith({
      container: expect.any(HTMLDivElement),
      animationData: expect.any(Object),
      renderer: 'svg',
      loop: true,
      autoplay: true,
    })
  })

  it('destroys the Lottie animation on unmount', () => {
    const destroyMock = jest.fn()
    loadAnimationMock.mockReturnValue({ destroy: destroyMock })

    const { unmount } = renderWithTheme(<Empty text="No data found" />)
    unmount()
    expect(destroyMock).toHaveBeenCalledTimes(1)
  })

  it('applies correct styles when hasFullHeight is true', () => {
    renderWithTheme(<Empty text="No data found" hasFullHeight={true} />)
    const animationContainer = screen.getByTestId('animation-container')
    const notFoundText = screen.getByTestId('not-found-text')

    expect(animationContainer).toHaveStyle('transform: scale(0.8)')
    expect(notFoundText).toHaveStyle('bottom: 80px')
  })

  it('applies correct styles when hasFullHeight is false', () => {
    renderWithTheme(<Empty text="No data found" hasFullHeight={false} />)
    const animationContainer = screen.getByTestId('animation-container')
    const notFoundText = screen.getByTestId('not-found-text')

    expect(animationContainer).toHaveStyle('height: 60vh')
    expect(notFoundText).toHaveStyle('bottom: 70px')
  })
})
