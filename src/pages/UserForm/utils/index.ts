import {
  ADDITIONAL_INFO_FIELDS,
  FIELD_CONFIG,
  HEMOGRAM_FIELDS,
  HEPATIC_FUNCTION_FIELDS,
  PERSONAL_INFO_FIELDS,
  RENAL_FUNCTION_FIELDS,
} from '../constants'
import { FormAndLatestTests, User } from '../interfaces'

export const calculateHealthScore = (
  data: { label: string; value: string }[],
): number => {
  const total = data.reduce((sum, item) => sum + parseFloat(item.value), 0)
  return Math.round(total / data.length)
}

export const mapUserToHGraphData = (user: User) => {
  const validFields = FIELD_CONFIG.filter((field) => {
    const value = user[field.id as keyof User]
    return value !== undefined && value !== ''
  })

  const totalWeight = validFields.reduce((sum, field) => sum + field.weight, 0)
  const weightAdjustmentFactor = 100 / totalWeight

  const adjustedData = validFields.map((field) => ({
    id: field.id,
    label: field.label,
    value: Number(user[field.id as keyof User]),
    healthyMin: field.healthyMin,
    healthyMax: field.healthyMax,
    absoluteMin: field.absoluteMin,
    absoluteMax: field.absoluteMax,
    unitLabel: field.unitLabel,
    weight: parseFloat((field.weight * weightAdjustmentFactor).toFixed(2)),
  }))

  const adjustedTotalWeight = adjustedData.reduce(
    (sum, item) => sum + item.weight,
    0,
  )
  const difference = 100 - adjustedTotalWeight
  if (Math.abs(difference) > 0.01) {
    adjustedData[adjustedData.length - 1].weight += difference
  }

  return adjustedData
}

export function convertFormToUser(form: FormAndLatestTests): User {
  return {
    name: form.name,
    age: form.age,
    weight: form.weight !== null ? form.weight.toString() : '',
    height: form.height !== null ? form.height.toString() : '',
    bmi: form.bmi !== null ? form.bmi.toString() : '',
    bloodType: form.blood_type ?? '',
    abdominalCircumference:
      form.abdominal_circumference !== null
        ? form.abdominal_circumference.toString()
        : '',
    hemoglobin: form.latest_hemoglobin,
    ast: form.latest_ast,
    alt: form.latest_alt,
    urea: form.latest_urea,
    redBloodCell: form.latest_red_blood_cell,
    creatinine: form.latest_creatinine,
    hematocrit: form.latest_hematocrit,
    glycatedHemoglobin: form.latest_glycated_hemoglobin,
    allergies: form.allergies ?? '',
    diseases: form.diseases ?? '',
    medications: form.medications ?? '',
    familyHistory: form.family_history ?? '',
    importantNotes: form.important_notes ?? '',
    imageReports: form.images_reports ?? '',
  }
}

export function convertUserToForm(user: User): FormAndLatestTests {
  return {
    name: user.name,
    age: user.age,
    weight: user.weight !== '' ? parseFloat(user.weight) : null,
    height: user.height !== '' ? parseFloat(user.height) : null,
    bmi: user.bmi !== '' ? parseFloat(user.bmi) : null,
    blood_type: user.bloodType || null,
    abdominal_circumference:
      user.abdominalCircumference !== ''
        ? parseFloat(user.abdominalCircumference)
        : null,
    latest_hemoglobin: user.hemoglobin,
    latest_ast: user.ast,
    latest_alt: user.alt,
    latest_urea: user.urea,
    latest_red_blood_cell: user.redBloodCell,
    latest_creatinine: user.creatinine,
    latest_hematocrit: user.hematocrit,
    latest_glycated_hemoglobin: user.glycatedHemoglobin,
    allergies: user.allergies || null,
    diseases: user.diseases || null,
    medications: user.medications || null,
    family_history: user.familyHistory || null,
    important_notes: user.importantNotes || null,
    images_reports: user.imageReports || null,
    form_status: user?.formStatus,
  }
}

function extractFieldNames(
  fields: { name: string }[],
  user: User,
): { name: string; value: string }[] {
  return fields.map((field) => {
    const fieldValue = user[field.name as keyof User]
    const value =
      fieldValue !== undefined && fieldValue !== null && fieldValue !== 'null'
        ? String(fieldValue)
        : ''

    return {
      name: field.name,
      value,
    }
  })
}

export function divideUserFields(user: User) {
  return {
    personalInfo: extractFieldNames(PERSONAL_INFO_FIELDS, user),
    hemogram: extractFieldNames(HEMOGRAM_FIELDS, user),
    hepaticFunction: extractFieldNames(HEPATIC_FUNCTION_FIELDS, user),
    renalFunction: extractFieldNames(RENAL_FUNCTION_FIELDS, user),
    additionalInfo: extractFieldNames(ADDITIONAL_INFO_FIELDS, user),
  }
}
