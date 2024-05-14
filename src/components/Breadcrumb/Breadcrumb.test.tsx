import { render, screen, fireEvent } from '@testing-library/react'
import { Breadcrumb, BreadcrumbItem } from '.'

jest.mock('./styles', () => ({
  Container: jest.fn(({ children }) => <div>{children}</div>),
  Label: jest.fn(({ children, onClick }) => (
    <span onClick={onClick}>{children}</span>
  )),
}))

jest.mock('./assets/ArrowIcon', () => ({
  ArrawIcon: jest.fn(() => <svg data-testid="arrow-icon" />),
}))

describe('Breadcrumb Component', () => {
  const items: BreadcrumbItem[] = [
    { label: 'Home', action: jest.fn(), activate: true },
    { label: 'Products', action: jest.fn() },
    { label: 'Electronics', action: jest.fn() },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumb items={items} />)
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('renders arrow icons between breadcrumb items', () => {
    render(<Breadcrumb items={items} />)
    const arrowIcons = screen.getAllByTestId('arrow-icon')
    expect(arrowIcons.length).toBe(items.length - 1)
  })

  it('calls the correct action on item click', () => {
    render(<Breadcrumb items={items} />)
    items.forEach((item) => {
      const breadcrumbElement = screen.getByText(item.label)
      fireEvent.click(breadcrumbElement)
      if (item.action) {
        expect(item.action).toHaveBeenCalled()
      }
    })
  })
})
