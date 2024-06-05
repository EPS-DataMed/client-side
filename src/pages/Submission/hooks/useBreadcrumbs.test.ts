import { renderHook } from '@testing-library/react-hooks'
import { useBreadcrumbs, BreadcrumbItem } from './useBreadcrumbs'

describe('useBreadcrumbs hook', () => {
  it('should return the correct breadcrumbs', () => {
    const { result } = renderHook(() => useBreadcrumbs())

    const expectedBreadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Pacientes',
        action: expect.any(Function),
      },
      {
        label: 'Enviar exames',
        activate: true,
      },
    ]

    expect(result.current).toEqual(expectedBreadcrumbs)
  })

  it('should have the correct active breadcrumb', () => {
    const { result } = renderHook(() => useBreadcrumbs())

    const enviarExamesBreadcrumb = result.current[1]
    expect(enviarExamesBreadcrumb.label).toBe('Enviar exames')
    expect(enviarExamesBreadcrumb.activate).toBe(true)
  })
})
