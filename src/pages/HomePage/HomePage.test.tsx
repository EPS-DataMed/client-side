import { render } from '@testing-library/react'
import { HomePage } from './'

test('renders Home page heading', () => {
  const { getByText } = render(<HomePage />)
  const headingElement = getByText(/Home page/i)
  expect(headingElement).toBeInTheDocument()
})
