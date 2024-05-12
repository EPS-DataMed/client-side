import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'

export const AnimatedCheckIcon = () => {
  const [animationData, setAnimationData] = useState(null)

  useEffect(() => {
    const fetchAnimationData = async () => {
      const response = await fetch(
        'https://raw.githubusercontent.com/dansousamelo/RQ_ISP/881f93d9d73ab66a6523db8f96a5f57ec30f5d96/client/src/components/DialogStatus/animations/checkIconAnimation.json',
      )
      const json = await response.json()
      setAnimationData(json)
    }

    console.log('entrou kraleo')

    fetchAnimationData()
  }, [])

  return animationData ? (
    <Lottie animationData={animationData} autoplay={true} />
  ) : null
}
