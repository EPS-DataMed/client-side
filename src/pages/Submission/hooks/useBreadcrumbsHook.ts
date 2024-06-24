import { useParams } from 'react-router-dom'
import { useBreadcrumbs } from './useBreadcrumbs'

export function useBreadcrumbsHook() {
  const { path } = useParams()
  return useBreadcrumbs({ path: path as string })
}
