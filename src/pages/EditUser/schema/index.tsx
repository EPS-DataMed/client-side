import { z } from 'zod'


export const EditSchema = z.object({
    userId: z.number(),
  
    password: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .regex(/[a-zA-Z]/, 'Deve conter letras')
      .regex(/\d/, 'Deve conter números'),

    newPassword: z 
        .string()
        .min(8, 'Deve conter no mínimo 8 caracteres')
        .regex(/[a-zA-Z]/, 'Deve conter letras')
        .regex(/\d/, 'Deve conter números'),

    confirmNewPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
})
.refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas estão diferentes',
    path: ['confirmPassword'],
})

export type EditFormData = z.infer<typeof EditSchema>
