import { Searchbar } from '../..'

interface HighlightQueryProps {
  option: string
  query: string
}

export const HighlightQuery = ({ option, query }: HighlightQueryProps) => {
  const startIndex = option.toLowerCase().indexOf(query.toLowerCase())
  if (startIndex === -1) return <span>{option}</span>

  const beforeQuery = option.substring(0, startIndex)
  const matchedQuery = option.substring(startIndex, startIndex + query.length)
  const afterQuery = option.substring(startIndex + query.length)

  return (
    <>
      {beforeQuery}
      <Searchbar.NonBoldText data-testid="non-bold-text">
        {matchedQuery}
      </Searchbar.NonBoldText>
      {afterQuery}
    </>
  )
}
