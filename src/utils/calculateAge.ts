export function calculateAge(birthDate: string): number {
  const birthDateObj = new Date(birthDate)
  const today = new Date()

  let age = today.getFullYear() - birthDateObj.getFullYear()
  const monthDifference = today.getMonth() - birthDateObj.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--
  }

  return age
}
