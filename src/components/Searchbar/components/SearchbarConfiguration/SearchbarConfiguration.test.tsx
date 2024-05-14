import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { SearchbarConfiguration, SearchbarConfigurationProps } from './'
import { OptionProps } from '../../hooks/useSearchbarQuery'
import { defaultTheme } from '../../../../styles/themes/default'

const options: OptionProps[] = [
  { name: 'Option 1', id: '1' },
  { name: 'Option 2', id: '2' },
  { name: 'Option 3', id: '3' },
  { name: 'Option 4', id: '4' },
]

const mockSetQuery = jest.fn()
const mockSetSelectedOption = jest.fn()
const mockOnDeleteItem = jest.fn()

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={defaultTheme}>{component}</ThemeProvider>)
}

const setup = (props: Partial<SearchbarConfigurationProps> = {}) => {
  const defaultProps: SearchbarConfigurationProps = {
    options,
    query: '',
    setQuery: mockSetQuery,
    setSelectedOption: mockSetSelectedOption,
    onDeleteItem: mockOnDeleteItem,
    selectedOption: {} as OptionProps,
    isRequisitionLoading: false,
  }

  return renderWithTheme(
    <SearchbarConfiguration {...defaultProps} {...props} />,
  )
}

describe('SearchbarConfiguration Component', () => {
  it('renders input with placeholder', () => {
    setup({ placeholder: 'Search...' })
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('renders no options when query does not match', () => {
    setup({ query: 'Non-existent' })
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
  })
})
