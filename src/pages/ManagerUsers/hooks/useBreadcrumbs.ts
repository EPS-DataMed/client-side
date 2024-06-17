import { useMemo } from 'react'
import useNavigation from '../../../hooks/useNavigation'
import { useUserContext } from '../../../contexts/UserContext'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs() {
  const { isDoctor } = useUserContext()

  const navigateTo = useNavigation()

  const BREADCRUMBS: BreadcrumbItem[] = useMemo(
    () => [
      {
        label: 'Home',
        action: () => navigateTo('/home'),
      },
      {
        label: `Gerenciar ${isDoctor ? 'pacientes' : 'dependentes'}`,
        activate: true,
      },
    ],
    [isDoctor, navigateTo],
  )

  return BREADCRUMBS
}
