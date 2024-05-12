export const lightenColor = (color: string, amount: number) => {
  const matchResult = color.slice(1).match(/.{2}/g)

  if (!matchResult) {
    return color
  }

  const [r, g, b] = matchResult.map((hex) => parseInt(hex, 16))

  const clamp = (value: number) => Math.max(0, Math.min(255, value))

  const newR = clamp(Math.floor(r + (255 - r) * amount))
  const newG = clamp(Math.floor(g + (255 - g) * amount))
  const newB = clamp(Math.floor(b + (255 - b) * amount))

  return `#${newR.toString(16).padStart(2, '0')}${newG
    .toString(16)
    .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}

export const darkenColor = (color: string, amount: number) => {
  const matchResult = color.slice(1).match(/.{2}/g)

  if (!matchResult) {
    return color
  }

  const [r, g, b] = matchResult.map((hex) => parseInt(hex, 16))

  const clamp = (value: number) => Math.max(0, Math.min(255, value))

  const newR = clamp(Math.floor(r * (1 - amount)))
  const newG = clamp(Math.floor(g * (1 - amount)))
  const newB = clamp(Math.floor(b * (1 - amount)))

  return `#${newR.toString(16).padStart(2, '0')}${newG
    .toString(16)
    .padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`
}
