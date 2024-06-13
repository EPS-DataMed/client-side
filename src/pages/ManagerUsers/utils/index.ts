export function formatDate(data: string): string {
  const meses = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ]

  const dataObj = new Date(data)
  const dia = dataObj.getDate()
  const mes = meses[dataObj.getMonth()]
  const ano = dataObj.getFullYear()

  return `${dia} de ${mes} de ${ano}`
}
