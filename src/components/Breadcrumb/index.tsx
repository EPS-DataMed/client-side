import { Fragment } from 'react'
import { ArrawIcon } from './assets/ArrowIcon'
import * as S from './styles'

export interface BreadcrumbItem {
  label: string
  action?: () => void
  activate?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <S.Container data-testid="breadcrumb">
      {items.map((breadcrumb, index) => (
        <Fragment key={breadcrumb.label}>
          <S.Label onClick={breadcrumb.action} activate={breadcrumb.activate}>
            {breadcrumb.label}
          </S.Label>
          {index < items.length - 1 && <ArrawIcon />}
        </Fragment>
      ))}
    </S.Container>
  )
}
