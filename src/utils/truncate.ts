export const truncateLabel = (label: string, maxLength: number) => {
  if (label.length > maxLength) {
    return label.slice(0, maxLength) + '...'
  }
  return label
}
