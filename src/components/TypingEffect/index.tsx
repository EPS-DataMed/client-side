import { useEffect, useState } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let currentIndex = 0

    const interval = setInterval(() => {
      if (currentIndex < text.length - 1) {
        setDisplayedText((prev) => prev + text[currentIndex])
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <span>{displayedText}</span>
}

export default TypingEffect
