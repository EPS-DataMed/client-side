import { ComponentProps, ElementType } from 'react'
import styled, { keyframes } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

const skeleton = keyframes({
  '0%': {
    backgroundColor: defaultTheme.colors.neutral400,
  },
  '100%': {
    backgroundColor: defaultTheme.colors.neutral600,
  },
})

const SkeletonStyled = styled.div`
  animation: ${skeleton} 1s linear infinite alternate;
`

interface SkeletonProps extends ComponentProps<typeof SkeletonStyled> {
  as?: ElementType
}

export function Skeleton(props: SkeletonProps) {
  return <SkeletonStyled {...props} />
}
