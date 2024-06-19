import React, { useState, useEffect } from 'react'

interface TypingEffectProps {
  text: string
  dataTestId?: string
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, dataTestId }) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [text])

  return <span data-testid={dataTestId}>{displayText}</span>
}

export default TypingEffect
