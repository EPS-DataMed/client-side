import * as S from './styles'

interface StepBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: () => JSX.Element | null
  description?: string
  animation?: 'slide' | 'vertical' | 'rotate' | 'fadeIn'
  enabled?: boolean
  children?: React.ReactNode
  typeAnimation?: 'infinite' | 'linear' | 'ease-in-out'
  timeAnimation?: string
  typeBox?: 'load_success' | 'list_tests'
  activeSkeleton?: boolean
}

export function StepBox({
  description,
  icon: Icon,
  animation,
  enabled = false,
  children,
  typeAnimation = 'infinite',
  timeAnimation = '2s',
  typeBox,
  activeSkeleton = false,
  ...rest
}: StepBoxProps) {
  const hasIcon = Icon && animation

  if (activeSkeleton) {
    return <S.SkeletonContainer />
  }

  return (
    <S.Container typeBox={typeBox} enabled={enabled} {...rest}>
      {hasIcon ? (
        <S.AnimationDiv
          timeAnimation={timeAnimation}
          animation={animation}
          typeAnimation={typeAnimation}
        >
          <Icon />
        </S.AnimationDiv>
      ) : null}

      {description ? (
        <S.Description enabled={enabled}>{description}</S.Description>
      ) : null}

      {children}
    </S.Container>
  )
}
