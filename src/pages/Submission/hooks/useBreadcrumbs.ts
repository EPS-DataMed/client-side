import { useMemo } from 'react'
import useNavigation from '../../../hooks/useNavigation'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs({ path }: { path: string }) {
  const navigateTo = useNavigation()

  const BREADCRUMBS: BreadcrumbItem[] = useMemo(() => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Home',
        action: () => navigateTo('/home'),
      },
      {
        label: 'Enviar exames',
        activate: true,
      },
    ]

    if (path === 'manager') {
      breadcrumbs.splice(1, 0, {
        label: 'Gerenciar dependentes',
        action: () => navigateTo('/manager/users'),
      })
    }

    return breadcrumbs
  }, [navigateTo, path])

  return BREADCRUMBS
}
