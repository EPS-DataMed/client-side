import { useMemo } from 'react'
import useNavigation from '../../../hooks/useNavigation'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs() {
  const navigateTo = useNavigation()

  const BREADCRUMBS: BreadcrumbItem[] = useMemo(
    () => [
      {
        label: 'Enviar exames',
        action: () => navigateTo('/submission', { replace: true }),
      },
      {
        label: 'Formulário',
        activate: true,
      },
    ],
    [navigateTo],
  )

  return BREADCRUMBS
}
