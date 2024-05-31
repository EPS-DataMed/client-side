export const PERSONAL_INFO_FIELDS = [
  {
    name: 'weight',
    label: 'Peso',
    placeholder: 'Ex: 82',
    description: '',
    required: true,
  },
  {
    name: 'height',
    label: 'Altura (cm)',
    placeholder: 'Ex: 180',
    description: '',
    required: true,
  },
  {
    name: 'bmi',
    label: 'IMC (kg/m²)',
    placeholder: 'Ex: 23.86',
    description: '',
    required: true,
  },
  {
    name: 'bloodType',
    label: 'Tipo sanguíneo',
    placeholder: 'Ex: O+',
    description: '',
    required: true,
  },
  {
    name: 'abdominalCircumference',
    label: 'Circunferência abdominal (cm)',
    placeholder: 'Ex: 60',
    description: '',
    required: true,
  },
]

export const HEMOGRAM_FIELDS = [
  {
    name: 'hemoglobin',
    label: 'Hemácias (milhões/µL)',
    placeholder: 'Ex: 4.2',
    description: '',
    required: true,
  },
  {
    name: 'hemoglobinA1c',
    label: 'Hemoglobina (g/dL)',
    placeholder: 'Ex: 12.3',
    description: '',
    required: true,
  },
  {
    name: 'hematocrit',
    label: 'Hematócrito (%)',
    placeholder: 'Ex: 35.5',
    description: '',
    required: true,
  },
  {
    name: 'glycatedHemoglobin',
    label: 'Hemoglobina Glicada (%)',
    placeholder: 'Ex: 123',
    required: true,
  },
]

export const HEPATIC_FUNCTION_FIELDS = [
  {
    name: 'ast',
    label: 'AST (U/L)',
    placeholder: 'Ex: 25',
    description: '',
    required: true,
  },
  {
    name: 'alt',
    label: 'ALT (U/L)',
    placeholder: 'Ex: 30',
    description: '',
    required: true,
  },
]

export const RENAL_FUNCTION_FIELDS = [
  {
    name: 'urea',
    label: 'Ureia (mg/dL)',
    placeholder: 'Ex: 15',
    description: '',
    required: true,
  },
  {
    name: 'creatinine',
    label: 'Creatinina (mg/dL)',
    placeholder: 'Ex: 1.2',
    description: '',
    required: true,
  },
]

export const ADDITIONAL_INFO_FIELDS = [
  {
    name: 'allergies',
    label: 'Alergias',
    placeholder: 'Clique para adcionar sua resposta.',
    description: 'Possui alguma alergia? Informe-nos abaixo.',
    required: true,
  },
  {
    name: 'diseases',
    label: 'Doenças',
    placeholder: 'Clique para adcionar sua resposta.',
    description: 'Possui alguma doença? Informe-nos abaixo.',
    required: true,
  },
  {
    name: 'medications',
    label: 'Medicações em uso',
    placeholder: 'Clique para adcionar sua resposta.',
    description: 'Faz uso de alguma medicação? Informe-nos abaixo.',
    required: true,
  },
  {
    name: 'familyHistory',
    label: 'Histórico Familiar',
    placeholder: 'Clique para adcionar sua resposta.',
    description:
      'Em relação ao seu histórico familiar,  informe-nos mais sobre.',
    required: true,
  },
  {
    name: 'importantNotes',
    label: 'Observações importantes',
    placeholder: 'Clique para adcionar sua resposta.',
    description:
      'Gostaria de nos informar alguma outra informação? Informe-nos abaixo.',
    required: true,
  },
  {
    name: 'imageReports',
    label: 'Exames de imagem (Descrever os laudos)',
    placeholder: 'Clique para adcionar sua resposta.',
    description:
      'Gostaria de nos enviar exames de imagem? Descreva os laudos dos exames. ',
    required: true,
  },
]
