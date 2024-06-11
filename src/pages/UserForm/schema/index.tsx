import { z } from 'zod'
import { BLOOD_TYPES } from '../constants'

export const schema = z.object({
  weight: z.string().min(1, 'Campo obrigatório'),
  height: z.string().min(1, 'Campo obrigatório'),
  bmi: z.string().min(1, 'Campo obrigatório'),
  bloodType: z
    .string()
    .min(1, 'Campo obrigatório')
    .refine((value) => BLOOD_TYPES.includes(value), {
      message: 'Tipo sanguíneo inválido',
    }),
  abdominalCircumference: z.string().min(1, 'Campo obrigatório'),
  hemoglobin: z.string().min(1, 'Campo obrigatório'),
  redBloodCell: z.string().min(1, 'Campo obrigatório'),
  ast: z.string().optional(),
  alt: z.string().optional(),
  urea: z.string().optional(),
  creatinine: z.string().optional(),
  hematocrit: z.string().min(1, 'Campo obrigatório'),
  glycatedHemoglobin: z.string().min(1, 'Campo obrigatório'),
  allergies: z.string().min(1, 'Campo obrigatório'),
  diseases: z.string().min(1, 'Campo obrigatório'),
  medications: z.string().min(1, 'Campo obrigatório'),
  familyHistory: z.string().min(1, 'Campo obrigatório'),
  importantNotes: z.string().optional(),
  imageReports: z.string().optional(),
})
