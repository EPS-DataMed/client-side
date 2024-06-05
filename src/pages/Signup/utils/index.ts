export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}
