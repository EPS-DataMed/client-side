import { z } from 'zod'
import { Sex } from '../../Signup/interfaces'

export const EditSchema = z.object({
  
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('E-mail em formato inválido'),
    dateOfBirth: z.string().nonempty('Data de nascimento é obrigatória'),
    sex: z
        .string()
        .refine((value) => value === Sex.Masculino || value === Sex.Feminino, {
        message: 'Sexo é obrigatório',
        }),
    specialty: z.string().optional(),
})

export type EditFormData = z.infer<typeof EditSchema>
