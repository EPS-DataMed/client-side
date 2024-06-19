import { ComponentProps, useState } from 'react'
import { Input } from '../../../Input'
import { Searchbar } from '../..'
import { HighlightQuery } from '../HighlightQuery'
import { OptionProps } from '../../hooks/useSearchbarQuery'
import { WrraperDelete } from './styles'
import { truncateLabel } from '../../../../utils/truncate'

type Props = ComponentProps<typeof Searchbar.Root>

export interface SearchbarConfigurationProps extends Props {
  options: OptionProps[]
  placeholder?: string
  query: string
  onDeleteItem: (option: OptionProps) => void
  selectedOption: OptionProps
  setQuery: (value: string) => void
  setSelectedOption: (value: OptionProps) => void
  isRequisitionLoading?: boolean
}

export function SearchbarConfiguration({
  options,
  placeholder = 'Digite para buscar...',
  query,
  setQuery,
  isRequisitionLoading,
  setSelectedOption,
  onDeleteItem,
}: SearchbarConfigurationProps) {
  const [filteredOptions, setFilteredOptions] = useState<OptionProps[]>([])
  const [isFocused, setIsFocused] = useState(false)
  const [isHovered, setIsHovered] = useState<OptionProps | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value
    const filtered = options.filter((option) =>
      option.name.toLowerCase().includes(userInput.toLowerCase()),
    )

    setFilteredOptions(filtered)
    setQuery(userInput)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setFilteredOptions(options)
  }

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false)
    }, 150)
  }

  const hasQuery = Boolean(query)
  const hasOptionsToShow = isFocused && filteredOptions.length > 0
  const optionsCount =
    filteredOptions.length > 4 ? 'fourOrMore' : 'lessThanFour'

  function handleClearSearch() {
    setQuery('')
    setSelectedOption({} as OptionProps)
  }

  function handleChooseOption(option: OptionProps) {
    setQuery(option.name)
    setSelectedOption(option)
  }

  return (
    <Searchbar.Root data-testid="searchbar-root">
      <Searchbar.SearchIconStyled data-testid="search-icon" />
      <Input.Root>
        <Input.Input
          variant="searchbar"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          data-testid="search-input"
        />
      </Input.Root>
      {isRequisitionLoading && (
        <div data-testid="loading-indicator">loading...</div>
      )}
      {hasQuery && !isRequisitionLoading && (
        <Searchbar.RoundCloseIconStyled
          onClick={handleClearSearch}
          data-testid="clear-icon"
        />
      )}
      {hasOptionsToShow && (
        <Searchbar.ScrollContainer
          optionsCount={optionsCount}
          data-testid="options-container"
        >
          <Searchbar.OptionsList optionsCount={optionsCount}>
            {filteredOptions.map((option) => (
              <Searchbar.OptionItem
                optionsCount={optionsCount}
                onMouseEnter={() => setIsHovered(option)}
                onMouseLeave={() => setIsHovered(null)}
                key={option.id}
                onClick={() => handleChooseOption(option)}
                data-testid={`option-item-${option.id}`}
              >
                {isHovered === option ? (
                  truncateLabel(option.name, 28)
                ) : (
                  <HighlightQuery
                    option={truncateLabel(option.name, 28)}
                    query={query}
                  />
                )}

                <WrraperDelete
                  onClick={(event) => {
                    event.stopPropagation()
                    onDeleteItem(option)
                  }}
                  data-testid={`delete-icon-${option.id}`}
                >
                  <Searchbar.DeleteIconStyled />
                </WrraperDelete>
              </Searchbar.OptionItem>
            ))}
          </Searchbar.OptionsList>
        </Searchbar.ScrollContainer>
      )}
    </Searchbar.Root>
  )
}
