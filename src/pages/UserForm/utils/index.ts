import { FIELD_CONFIG } from '../constants'
import { User } from '../interfaces'

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
