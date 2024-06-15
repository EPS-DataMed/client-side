import { z } from 'zod'

export const RecoverSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

export type RecoverFormData = z.infer<typeof RecoverSchema>
