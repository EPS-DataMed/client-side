import { useState } from 'react'

export interface OptionProps {
  name: string
  id: string | number
}

export type SearchbarQueryHookReturnType = {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionProps>>
  selectedOption: OptionProps
}

export const useSearchbarQuery = (): SearchbarQueryHookReturnType => {
  const [query, setQuery] = useState<string>('')
  const [selectedOption, setSelectedOption] = useState<OptionProps>(
    {} as OptionProps,
  )
  const [isLoading, setIsLoading] = useState(false)

  return {
    query,
    setQuery,
    isLoading,
    setIsLoading,
    setSelectedOption,
    selectedOption,
  }
}
