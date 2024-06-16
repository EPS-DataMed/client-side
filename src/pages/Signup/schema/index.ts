import { z } from 'zod'
import { Sex } from '../interfaces'

export const SignupSchema = z
  .object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('E-mail em formato inválido'),
    dateOfBirth: z.string().nonempty('Data de nascimento é obrigatória'),
    sex: z
      .string()
      .refine((value) => value === Sex.Masculino || value === Sex.Feminino, {
        message: 'Sexo é obrigatório',
      }),
    password: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .regex(/[a-zA-Z]/, 'Deve conter letras')
      .regex(/\d/, 'Deve conter números'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    crm: z.string().optional(),
    specialty: z.string().optional(),
    termsOfPrivacy: z.boolean().refine((val) => val === true, {
      message: 'Aceitação dos Termos de Privacidade é obrigatória',
    }),
    termsOfUse: z.boolean().refine((val) => val === true, {
      message: 'Aceitação dos Termos de Uso é obrigatória',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas estão diferentes',
    path: ['confirmPassword'],
  })

export type SignupFormData = z.infer<typeof SignupSchema>
