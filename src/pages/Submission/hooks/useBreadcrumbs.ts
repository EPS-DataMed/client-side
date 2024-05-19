// src/hooks/useBreadcrumbs.ts
import { useMemo } from 'react'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

export function useBreadcrumbs() {
  const BREADCRUMBS: BreadcrumbItem[] = useMemo(
    () => [
      {
        label: 'Pacientes',
        action: () => console.log('Pacientes'),
      },
      {
        label: 'Enviar exames',
        activate: true,
      },
    ],
    [],
  )

  return BREADCRUMBS
}
