import { renderHook, act } from '@testing-library/react-hooks'
import { useDialogControlled } from './useDialogControlled'

describe('useDialogControlled', () => {
  it('should initialize with dialog closed', () => {
    const { result } = renderHook(() => useDialogControlled())
    expect(result.current.isDialogControlledOpen).toBe(false)
  })

  it('should open the dialog when handleUpdateDialogControlled is called with true', () => {
    const { result } = renderHook(() => useDialogControlled())
    act(() => {
      result.current.handleUpdateDialogControlled(true)
    })
    expect(result.current.isDialogControlledOpen).toBe(true)
  })

  it('should close the dialog when handleUpdateDialogControlled is called with false', () => {
    const { result } = renderHook(() => useDialogControlled())
    act(() => {
      result.current.handleUpdateDialogControlled(true)
    })
    expect(result.current.isDialogControlledOpen).toBe(true)
    act(() => {
      result.current.handleUpdateDialogControlled(false)
    })
    expect(result.current.isDialogControlledOpen).toBe(false)
  })
})
