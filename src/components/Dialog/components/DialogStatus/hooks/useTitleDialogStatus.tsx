interface TitleDialogStatus {
  fullString: string
  substring: string
}

export function useTitleDialogStatus({
  fullString,
  substring,
}: TitleDialogStatus) {
  const startIndex = fullString.indexOf(substring)

  if (startIndex !== -1) {
    const endIndex = startIndex + substring.length

    const highlightedPart = `<b>${fullString.slice(startIndex, endIndex)}</b>`
    const result = `${fullString.slice(
      0,
      startIndex,
    )}${highlightedPart}${fullString.slice(endIndex)}`

    return `<span>${result}</span>`
  } else {
    return `<span>${fullString}</span>`
  }
}
