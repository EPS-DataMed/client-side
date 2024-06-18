import { render } from '@testing-library/react'
import { TitleUpdater } from '.'

describe('TitleUpdater Component', () => {
  it('sets the document title on mount', () => {
    const title = 'Test Title'
    render(<TitleUpdater title={title} />)
    expect(document.title).toBe(`Datamed • ${title}`)
  })

  it('updates the document title when title prop changes', () => {
    const { rerender } = render(<TitleUpdater title="Initial Title" />)
    expect(document.title).toBe('Datamed • Initial Title')

    rerender(<TitleUpdater title="Updated Title" />)
    expect(document.title).toBe('Datamed • Updated Title')
  })

  it('resets the document title on unmount', () => {
    const { unmount } = render(<TitleUpdater title="Test Title" />)
    expect(document.title).toBe('Datamed • Test Title')

    unmount()
    expect(document.title).toBe('Datamed')
  })
})
