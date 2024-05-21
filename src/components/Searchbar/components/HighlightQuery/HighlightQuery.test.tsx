import React from 'react'
import { render, screen } from '@testing-library/react'
import { HighlightQuery } from '.'

jest.mock('../..', () => ({
  Searchbar: {
    NonBoldText: ({ children }: { children: React.ReactNode }) => (
      <span data-testid="highlight">{children}</span>
    ),
  },
}))

describe('HighlightQuery Component', () => {
  it('renders the option without highlighting when query is not found', () => {
    render(<HighlightQuery option="Hello, world!" query="test" />)
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()
    expect(screen.queryByTestId('highlight')).not.toBeInTheDocument()
  })

  it('highlights the matched query at the beginning of the option', () => {
    render(<HighlightQuery option="Hello, world!" query="Hello" />)
    expect(screen.getByTestId('highlight')).toHaveTextContent('Hello')
    expect(screen.getByText(', world!')).toBeInTheDocument()
  })

  it('highlights the matched query at the end of the option', () => {
    render(<HighlightQuery option="Hello, world!" query="world!" />)
    expect(screen.getByText('Hello,')).toBeInTheDocument()
    expect(screen.getByTestId('highlight')).toHaveTextContent('world!')
  })

  it('renders the entire option as highlighted when query matches the whole option', () => {
    render(<HighlightQuery option="Hello" query="Hello" />)
    expect(screen.getByTestId('highlight')).toHaveTextContent('Hello')
  })
})
