import { useMemo } from 'react'
import useNavigation from '../../../hooks/useNavigation'
import { useUserContext } from '../../../contexts/UserContext'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs({ path }: { path: string }) {
  const { isDoctor } = useUserContext()
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
        label: isDoctor ? 'Gerenciar pacientes' : 'Gerenciar dependentes',
        action: () => navigateTo('/manager/users'),
      })
    }

    return breadcrumbs
  }, [isDoctor, navigateTo, path])

  return BREADCRUMBS
}
