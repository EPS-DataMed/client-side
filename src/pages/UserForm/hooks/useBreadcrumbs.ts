import { useMemo, useCallback } from 'react'
import useNavigation from '../../../hooks/useNavigation'
import { useParams } from 'react-router-dom'
import { useUserContext } from '../../../contexts/UserContext'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs() {
  const navigateTo = useNavigation()
  const { dependentId } = useParams<{ dependentId: string }>()
  const { isDoctor } = useUserContext()

  const getBreadcrumbs = useCallback(
    (isDependent: boolean, isDoctor: boolean) => {
      const items: BreadcrumbItem[] = [
        {
          label: isDoctor ? 'Gerenciar pacientes' : 'Gerenciar dependentes',
          action: isDependent ? () => navigateTo('/manager/users') : undefined,
        },
        {
          label: 'Enviar exames',
          action: isDependent
            ? () =>
                navigateTo(`/submission/home/${dependentId}`, { replace: true })
            : () =>
                navigateTo(`/submission/home/null`, {
                  replace: true,
                }),
        },
        {
          label: 'Formulário',
          activate: true,
        },
      ]

      return items.filter((item) => item.action || item.activate)
    },
    [navigateTo, dependentId],
  )

  const breadcrumbs = useMemo(
    () => getBreadcrumbs(dependentId !== 'null', isDoctor),
    [getBreadcrumbs, dependentId, isDoctor],
  )

  return breadcrumbs
}
