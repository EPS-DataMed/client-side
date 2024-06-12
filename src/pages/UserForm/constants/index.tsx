import { FieldConfig, User } from '../interfaces'

export const PERSONAL_INFO_FIELDS = [
  {
    name: 'weight',
    label: 'Peso (kg)',
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
    name: 'redBloodCell',
    label: 'Hemácias (milhões/mm³)',
    placeholder: 'Ex: 4.5',
    description: '',
    required: true,
  },
  {
    name: 'hemoglobin',
    label: 'Hemoglobina (g/dL)',
    placeholder: 'Ex: 14.0',
    description: '',
    required: true,
  },
  {
    name: 'hematocrit',
    label: 'Hematócrito (%)',
    placeholder: 'Ex: 45',
    description: '',
    required: true,
  },
  {
    name: 'glycatedHemoglobin',
    label: 'Hemoglobina Glicada (%)',
    placeholder: 'Ex: 5.2',
    required: true,
  },
]

export const HEPATIC_FUNCTION_FIELDS = [
  {
    name: 'ast',
    label: 'AST (U/L)',
    placeholder: 'Ex: 30',
    description: '',
    required: true,
  },
  {
    name: 'alt',
    label: 'ALT (U/L)',
    placeholder: 'Ex: 40',
    description: '',
    required: true,
  },
]

export const RENAL_FUNCTION_FIELDS = [
  {
    name: 'urea',
    label: 'Ureia (mg/dL)',
    placeholder: 'Ex: 20',
    description: '',
    required: true,
  },
  {
    name: 'creatinine',
    label: 'Creatinina (mg/dL)',
    placeholder: 'Ex: 1.0',
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
    required: false,
  },
  {
    name: 'imageReports',
    label: 'Exames de imagem (Descrever os laudos)',
    placeholder: 'Clique para adcionar sua resposta.',
    description:
      'Gostaria de nos enviar exames de imagem? Descreva os laudos dos exames. ',
    required: false,
  },
]

export const PAGE_PRINT_STYLE = `
@media print {
  body {
    -webkit-print-color-adjust: exact;
  }
  @page {
    size: A4;
    margin: 200mm !important;
  }
}
`

export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const FIELD_CONFIG: FieldConfig<keyof User>[] = [
  {
    id: 'hemoglobin',
    label: 'Hemoglobina',
    healthyMin: 12,
    healthyMax: 16,
    absoluteMin: 0,
    absoluteMax: 20,
    unitLabel: 'g/dL',
    weight: 12.5,
  },
  {
    id: 'ast',
    label: 'AST',
    healthyMin: 5,
    healthyMax: 40,
    absoluteMin: 0,
    absoluteMax: 50,
    unitLabel: 'U/L',
    weight: 12.5,
  },
  {
    id: 'alt',
    label: 'ALT',
    healthyMin: 7,
    healthyMax: 56,
    absoluteMin: 0,
    absoluteMax: 60,
    unitLabel: 'U/L',
    weight: 12.5,
  },
  {
    id: 'urea',
    label: 'Ureia',
    healthyMin: 10,
    healthyMax: 40,
    absoluteMin: 0,
    absoluteMax: 50,
    unitLabel: 'mg/dL',
    weight: 12.5,
  },
  {
    id: 'creatinine',
    label: 'Creatinina',
    healthyMin: 0.6,
    healthyMax: 1.3,
    absoluteMin: 0,
    absoluteMax: 2,
    unitLabel: 'mg/dL',
    weight: 12.5,
  },
  {
    id: 'hematocrit',
    label: 'Hematócrito',
    healthyMin: 37,
    healthyMax: 52,
    absoluteMin: 20,
    absoluteMax: 60,
    unitLabel: '%',
    weight: 12.5,
  },
  {
    id: 'redBloodCell',
    label: 'Hemácia',
    healthyMin: 4.2,
    healthyMax: 5.9,
    absoluteMin: 0,
    absoluteMax: 10,
    unitLabel: 'milhões/mm³',
    weight: 12.5,
  },
  {
    id: 'glycatedHemoglobin',
    label: 'Hemoglobina Glicada',
    healthyMin: 4,
    healthyMax: 5.6,
    absoluteMin: 0,
    absoluteMax: 10,
    unitLabel: '%',
    weight: 12.5,
  },
]
