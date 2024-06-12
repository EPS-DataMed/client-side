import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import processDataRun from '../../../../assets/jsonAnimations/processDataRun.json'
import * as S from './styles'

export function ProcessDataLoading() {
  const MESSAGES = [
    'Processando dados, aguarde',
    'Pode demorar um pouco',
    'Enquanto isso, que tal ir beber uma água?',
    'Aproveite para esticar as pernas!',
    'Estamos quase lá, só mais um pouco!',
    'Que tal verificar seus e-mails enquanto isso?',
    'Tempo para um café rápido?',
  ]

  const [messageIndex, setMessageIndex] = useState(0)
  const [fade, setFade] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const handleFadeOut = () => {
      setFade('out')
      setTimeout(updateMessageIndex, 500)
    }

    const updateMessageIndex = () => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % MESSAGES.length)
      setFade('in')
    }

    const interval = setInterval(handleFadeOut, 3000)
    return () => clearInterval(interval)
  }, [MESSAGES.length])

  return (
    <S.Container>
      <S.WrapperLottie>
        <Lottie animationData={processDataRun} autoplay={true} />
      </S.WrapperLottie>

      <S.MessageLoading fade={fade}>{MESSAGES[messageIndex]}</S.MessageLoading>
    </S.Container>
  )
}
