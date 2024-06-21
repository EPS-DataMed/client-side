export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}

export const getFormattedDate = (date: string) => {
  const splitDate = date.split('-')
  return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
}
