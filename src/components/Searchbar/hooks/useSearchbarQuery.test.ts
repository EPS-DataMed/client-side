import { renderHook, act } from '@testing-library/react-hooks'
import { useSearchbarQuery, OptionProps } from './useSearchbarQuery'

describe('useSearchbarQuery', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useSearchbarQuery())

    expect(result.current.query).toBe('')
    expect(result.current.selectedOption).toEqual({})
    expect(result.current.isLoading).toBe(false)
  })

  it('should update query correctly', () => {
    const { result } = renderHook(() => useSearchbarQuery())

    act(() => {
      result.current.setQuery('test query')
    })

    expect(result.current.query).toBe('test query')
  })

  it('should update selectedOption correctly', () => {
    const { result } = renderHook(() => useSearchbarQuery())

    const option: OptionProps = { name: 'Option 1', id: '1' }

    act(() => {
      result.current.setSelectedOption(option)
    })

    expect(result.current.selectedOption).toEqual(option)
  })

  it('should update isLoading correctly', () => {
    const { result } = renderHook(() => useSearchbarQuery())

    act(() => {
      result.current.setIsLoading(true)
    })

    expect(result.current.isLoading).toBe(true)

    act(() => {
      result.current.setIsLoading(false)
    })

    expect(result.current.isLoading).toBe(false)
  })
})
