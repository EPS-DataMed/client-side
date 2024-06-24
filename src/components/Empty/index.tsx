import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'
import emptyAnimation from './assets/empty_animation.json'
import * as S from './styles'

export function Empty({
  text,
  hasFullHeight = false,
}: {
  text: string
  hasFullHeight?: boolean
}) {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let anim: AnimationItem | undefined

    if (container.current) {
      anim = lottie.loadAnimation({
        container: container.current,
        animationData: emptyAnimation,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      })
    }

    return () => {
      if (anim) {
        anim.destroy()
      }
    }
  }, [])

  return (
    <>
      <S.Container data-testid="empty-state">
        <S.Animation
          ref={container}
          hasFullHeight={hasFullHeight}
          data-testid="animation-container"
        />
        <S.NotFoundText
          hasFullHeight={hasFullHeight}
          data-testid="not-found-text"
        >
          {text}
        </S.NotFoundText>
      </S.Container>
    </>
  )
}
