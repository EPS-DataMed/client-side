import { useEffect } from 'react'

const useRemoveSpecificSvg = () => {
  useEffect(() => {
    const removeSvgElement = () => {
      const svgTextElement = document.querySelector(
        'svg text[id="__react_svg_text_measurement_id"]',
      )
      if (
        svgTextElement &&
        svgTextElement.parentNode &&
        svgTextElement.parentNode instanceof Element
      ) {
        svgTextElement.parentNode.remove()
      }
    }

    removeSvgElement()

    const observer = new MutationObserver(() => {
      removeSvgElement()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])
}

export default useRemoveSpecificSvg
