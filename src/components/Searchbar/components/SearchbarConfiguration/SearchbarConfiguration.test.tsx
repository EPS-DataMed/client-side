import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SearchbarConfiguration, SearchbarConfigurationProps } from './'
import AppProviders from '../../../AppProviders'

const mockOptions = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
  { id: '4', name: 'Option 4' },
  { id: '5', name: 'Option 5' },
]

const renderComponent = (props: Partial<SearchbarConfigurationProps> = {}) => {
  const defaultProps: SearchbarConfigurationProps = {
    options: mockOptions,
    query: '',
    placeholder: 'Digite para buscar...',
    onDeleteItem: jest.fn(),
    selectedOption: {} as any,
    setQuery: jest.fn(),
    setSelectedOption: jest.fn(),
    isRequisitionLoading: false,
    ...props,
  }
  return render(
    <AppProviders>
      <SearchbarConfiguration {...defaultProps} />
    </AppProviders>,
  )
}

describe('SearchbarConfiguration', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByTestId('searchbar-root')).toBeInTheDocument()
  })

  it('displays the search input with correct placeholder', () => {
    renderComponent()
    const input = screen.getByTestId('search-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Digite para buscar...')
  })

  it('updates query on input change', () => {
    const setQuery = jest.fn()
    renderComponent({ setQuery })

    const input = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'Option 1' } })

    expect(setQuery).toHaveBeenCalledWith('Option 1')
  })

  it('displays options when focused', () => {
    renderComponent()

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    expect(screen.getByTestId('options-container')).toBeInTheDocument()
  })

  it('hides options when input is blurred', async () => {
    renderComponent()

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)
    fireEvent.blur(input)

    await waitFor(() => {
      expect(screen.queryByTestId('options-container')).not.toBeInTheDocument()
    })
  })

  it('filters options based on input value', () => {
    const setQuery = jest.fn()
    renderComponent({ setQuery })

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)
    fireEvent.change(input, { target: { value: 'Option 1' } })

    expect(screen.getByTestId('option-item-1')).toBeInTheDocument()
    expect(screen.queryByTestId('option-item-2')).not.toBeInTheDocument()
  })

  it('clears query when clear icon is clicked', () => {
    const setQuery = jest.fn()
    const setSelectedOption = jest.fn()
    renderComponent({ setQuery, setSelectedOption, query: 'Option 1' })

    const clearIcon = screen.getByTestId('clear-icon')
    fireEvent.click(clearIcon)

    expect(setQuery).toHaveBeenCalledWith('')
    expect(setSelectedOption).toHaveBeenCalledWith({})
  })

  it('calls onDeleteItem when delete icon is clicked', () => {
    const onDeleteItem = jest.fn()
    renderComponent({ onDeleteItem })

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    const deleteIcon = screen.getByTestId('delete-icon-1')
    fireEvent.click(deleteIcon)

    expect(onDeleteItem).toHaveBeenCalledWith(mockOptions[0])
  })

  it('selects an option when it is clicked', () => {
    const setQuery = jest.fn()
    const setSelectedOption = jest.fn()
    renderComponent({ setQuery, setSelectedOption })

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    const optionItem = screen.getByTestId('option-item-1')
    fireEvent.click(optionItem)

    expect(setQuery).toHaveBeenCalledWith('Option 1')
    expect(setSelectedOption).toHaveBeenCalledWith(mockOptions[0])
  })

  it('does not display options when not focused', () => {
    renderComponent()

    expect(screen.queryByTestId('options-container')).toBeNull()
  })

  it('shows loading state when isRequisitionLoading is true', () => {
    renderComponent({ isRequisitionLoading: true })

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument()
  })

  it('does not display clear icon when query is empty', () => {
    renderComponent({ query: '' })

    expect(screen.queryByTestId('clear-icon')).toBeNull()
  })

  it('handles hover state on option item', () => {
    renderComponent()

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    const optionItem = screen.getByTestId('option-item-1')
    fireEvent.mouseEnter(optionItem)
    fireEvent.mouseLeave(optionItem)
  })

  it('highlights query in option item', () => {
    renderComponent({ query: 'Option' })

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    const optionItem = screen.getByTestId('option-item-1')
    const nonBoldText = optionItem.querySelector(
      '[data-testid="non-bold-text"]',
    )

    expect(nonBoldText).toBeInTheDocument()
    expect(nonBoldText).toHaveTextContent('Option')
  })

  it('calculates optionsCount correctly', () => {
    renderComponent({ query: 'Option' })

    const input = screen.getByTestId('search-input')
    fireEvent.focus(input)

    const optionsContainer = screen.getByTestId('options-container')
    expect(optionsContainer).toHaveAttribute('optionscount', 'fourOrMore')

    fireEvent.change(input, { target: { value: 'Option 1' } })
    expect(optionsContainer).toHaveAttribute('optionscount', 'lessThanFour')
  })
})
