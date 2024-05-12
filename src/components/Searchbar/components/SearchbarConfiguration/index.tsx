import { ComponentProps, useState } from 'react'
import { Input } from '../../../Input'
import { Searchbar } from '../..'
import { HighlightQuery } from '../HighlightQuery'
import { OptionProps } from '../../hooks/useSearchbarQuery'
import { WrraperDelete } from './styles'

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
  const [isHovered, setIsHovered] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.currentTarget.value
    const filtered = options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
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

  const truncateLabel = (label: string, maxLength: number) => {
    if (label.length > maxLength) {
      return label.slice(0, maxLength) + '...'
    }
    return label
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
    <Searchbar.Root>
      <Searchbar.SearchIconStyled />
      <Input.Root>
        <Input.Input
          variant="searchbar"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Input.Root>
      {hasQuery && !isRequisitionLoading && (
        <Searchbar.RoundCloseIconStyled onClick={handleClearSearch} />
      )}
      {hasOptionsToShow && (
        <Searchbar.ScrollContainer optionsCount={optionsCount}>
          <Searchbar.OptionsList optionsCount={optionsCount}>
            {filteredOptions.map((option) => (
              <Searchbar.OptionItem
                optionsCount={optionsCount}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                key={option.id}
                onClick={() => handleChooseOption(option)}
              >
                {isHovered ? (
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
