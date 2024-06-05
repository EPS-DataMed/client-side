import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha é obrigatória'),
})

export type LoginFormData = z.infer<typeof loginSchema>
