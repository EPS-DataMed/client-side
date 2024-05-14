import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeProvider } from 'styled-components'
import { SearchbarConfiguration, SearchbarConfigurationProps } from './'
import { defaultTheme } from '../../../../styles/themes/default'

const mockOptions = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
  { id: '3', name: 'Option 3' },
  { id: '4', name: 'Option 4' },
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
    <ThemeProvider theme={defaultTheme}>
      <SearchbarConfiguration {...defaultProps} />
    </ThemeProvider>,
  )
}

describe('SearchbarConfiguration', () => {
  it('renders correctly', () => {
    renderComponent()
    expect(screen.getByTestId('searchbar-root')).toBeInTheDocument()
  })

  it('displays the search input', () => {
    renderComponent()
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
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
})
