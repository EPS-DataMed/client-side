import * as S from './styles'

interface DisabledBoxProps {
  icon?: () => JSX.Element | null
  description?: string
  animation?: 'slide' | 'vertical' | 'rotate' | 'fadeIn'
  enabled?: boolean
  children?: React.ReactNode
  typeAnimation?: 'infinite' | 'linear' | 'ease-in-out'
  timeAnimation?: string
}

export function StepBox({
  description,
  icon: Icon,
  animation,
  enabled = false,
  children,
  typeAnimation = 'infinite',
  timeAnimation = '2s',
}: DisabledBoxProps) {
  const hasIcon = Icon && animation

  return (
    <S.Container enabled={enabled}>
      {hasIcon ? (
        <S.AnimationDiv
          timeAnimation={timeAnimation}
          animation={animation}
          typeAnimation={typeAnimation}
        >
          <Icon />
        </S.AnimationDiv>
      ) : null}

      {description ? <S.Description>{description}</S.Description> : null}

      {children}
    </S.Container>
  )
}
