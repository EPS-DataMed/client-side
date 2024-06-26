export type DialogStep = '' | 'save_form' | 'logout'

export interface User {
  name: string
  age: number
  weight: string
  height: string
  bmi: string
  bloodType: string
  abdominalCircumference: string
  hemoglobin: string
  ast: string
  alt: string
  urea: string
  redBloodCell: string
  creatinine: string
  hematocrit: string
  glycatedHemoglobin: string
  allergies: string
  diseases: string
  medications: string
  familyHistory: string
  importantNotes?: string
  imageReports?: string
  formStatus?: string
}

export interface FormAndLatestTests {
  weight: number | null
  height: number | null
  bmi: number | null
  blood_type: string | null
  abdominal_circumference: number | null
  allergies: string | null
  diseases: string | null
  medications: string | null
  family_history: string | null
  important_notes: string | null
  images_reports: string | null
  form_status?: string
  latest_red_blood_cell: string
  latest_hemoglobin: string
  latest_hematocrit: string
  latest_glycated_hemoglobin: string
  latest_ast: string
  latest_alt: string
  latest_urea: string
  latest_creatinine: string
  age: number
  name: string
}

interface HGraphDatum {
  id: string
  label: string
  value: number
  healthyMin: number
  healthyMax: number
  absoluteMin: number
  absoluteMax: number
  unitLabel: string
  children?: HGraphDatum[]
}

interface Margin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface HGraphProps {
  data: HGraphDatum[]
  score?: number
  color?: string
  width?: number
  height?: number
  margin?: Margin
  thresholdMin?: number
  thresholdMax?: number
  donutHoleFactor?: number
  healthyRangeFillColor?: string
  fontSize?: number
  fontColor?: string
  showAxisLabel?: boolean
  axisLabelOffset?: number
  axisLabelWrapWidth?: number
  areaOpacity?: number
  pointRadius?: number
  pointLabelOffset?: number
  pointLabelWrapWidth?: number | null
  hitboxRadius?: number
  showScore?: boolean
  scoreFontSize?: number
  scoreFontColor?: string
  zoomFactor?: number
  zoomTransitionTime?: number
  zoomOnPointClick?: boolean
  onPointClick?: (
    d: HGraphDatum,
    e: React.MouseEvent<SVGCircleElement, MouseEvent>,
  ) => void
}

export interface FieldConfig<K extends keyof User> {
  id: K
  label: string
  healthyMin: number
  healthyMax: number
  absoluteMin: number
  absoluteMax: number
  unitLabel: string
  weight: number
}
