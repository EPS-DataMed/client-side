import { z } from 'zod'

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .regex(/[a-zA-Z]/, 'Deve conter letras')
      .regex(/\d/, 'Deve conter números'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas estão diferentes',
    path: ['confirmPassword'],
  })

export type ChangePasswordFormData = z.infer<typeof ChangePasswordSchema>
