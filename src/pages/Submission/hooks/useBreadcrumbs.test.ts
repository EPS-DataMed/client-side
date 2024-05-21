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

  it('should call the correct action for Pacientes breadcrumb', () => {
    const { result } = renderHook(() => useBreadcrumbs())

    const pacientesBreadcrumb = result.current[0]
    expect(pacientesBreadcrumb.label).toBe('Pacientes')

    console.log = jest.fn()
    pacientesBreadcrumb.action && pacientesBreadcrumb.action()
    expect(console.log).toHaveBeenCalledWith('Pacientes')
  })

  it('should have the correct active breadcrumb', () => {
    const { result } = renderHook(() => useBreadcrumbs())

    const enviarExamesBreadcrumb = result.current[1]
    expect(enviarExamesBreadcrumb.label).toBe('Enviar exames')
    expect(enviarExamesBreadcrumb.activate).toBe(true)
  })
})
