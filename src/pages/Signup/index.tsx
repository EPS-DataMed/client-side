import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as Page from '../../components/GenericSignupLoginPage'
import { useLocation } from 'react-router-dom'
import * as S from './styles'
import { LogoSVG } from '../../assets/logo'
import { PrimaryButton } from '../../components/PrimaryButton'
import TypingEffect from '../../components/TypingEffect'
import InputField from '../../components/Input/InputField'
import { Input } from '../../components/Input'
import { MEDIACL_SPECIALTIES } from './constants'
import { useUserContext } from '../../contexts/UserContext'
import useNavigation from '../../hooks/useNavigation'
import { useState } from 'react'
import { GenericPage } from '../../components/GenericPage'

enum Sex {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
}

const SignupSchema = z
  .object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('E-mail em formato inválido'),
    dateOfBirth: z.string().nonempty('Data de nascimento é obrigatória'),
    sex: z.nativeEnum(Sex, {
      required_error: 'Sexo é obrigatório',
    }),
    password: z
      .string()
      .min(8, 'Deve conter no mínimo 8 caracteres')
      .regex(/[a-zA-Z]/, 'Deve conter letras')
      .regex(/\d/, 'Deve conter números'),
    confirmPassword: z.string().nonempty('Confirmação de senha é obrigatória'),
    crm: z.string().optional(),
    specialty: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas estão diferentes',
    path: ['confirmPassword'],
  })

type SignupFormData = z.infer<typeof SignupSchema>

export function Signup() {
  const location = useLocation()
  const { user: userFromNavigation } = location.state || { user: {} }
  const navigateTo = useNavigation()
  const { setUser } = useUserContext()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: userFromNavigation?.name || '',
      email: userFromNavigation?.email || '',
      dateOfBirth: userFromNavigation?.dateOfBirth || '',
      sex: userFromNavigation?.sex || '',
      password: '',
      confirmPassword: '',
      crm: '',
      specialty: '',
    },
  })

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    setLoading(true)
    setUser(data)
    setTimeout(() => {
      navigateTo('/', { replace: true })
      setLoading(false)
    }, 2000)
  }

  return (
    <Page.Background>
      <Page.Content>
        <Page.WrapperLogoAndText>
          <LogoSVG height="91px" width="98px" />
          <Page.LogoTitle>
            <TypingEffect text="Daatamed" />
          </Page.LogoTitle>
          <Page.Slogan>
            <TypingEffect text="Teenha seus dados de saúde ao seu alcance." />
          </Page.Slogan>
        </Page.WrapperLogoAndText>

        <S.SignupForm onSubmit={handleSubmit(onSubmit)}>
          <S.SignupFieldsForm>
            <InputField
              label="Nome Completo"
              name="name"
              control={control}
              description="Informe o seu nome completo, sem abreviações."
              required
            />

            <InputField
              label="E-mail"
              name="email"
              control={control}
              description="Informe o seu e-mail pessoal."
              required
            />

            <InputField
              label="Data de Nascimento"
              name="dateOfBirth"
              control={control}
              description="Informe sua data de nascimento."
              required
            />

            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <Input.Root>
                  <Input.Label>Sexo *</Input.Label>
                  <Input.Description>Informe seu sexo.</Input.Description>
                  <S.SexInput {...field} hasError={Boolean(errors.sex)}>
                    <option value="">Selecione</option>
                    <option value={Sex.Masculino}>Masculino</option>
                    <option value={Sex.Feminino}>Feminino</option>
                  </S.SexInput>
                  {errors.sex && (
                    <Input.ErrorMessageRoot>
                      <Input.ErrorMessage>
                        {errors.sex.message}
                      </Input.ErrorMessage>
                    </Input.ErrorMessageRoot>
                  )}
                </Input.Root>
              )}
            />

            <InputField
              label="Senha"
              name="password"
              type="password"
              control={control}
              description="Deve conter pelo menos oito caracteres, com letras e números."
              required
            />

            <InputField
              label="Confirme sua senha"
              name="confirmPassword"
              control={control}
              type="password"
              description="Confirme sua senha definida no campo acima."
              required
            />

            <InputField
              label="CRM"
              name="crm"
              control={control}
              description="Informe o CRM/ESTADO (se aplicável)."
            />

            <Controller
              name="specialty"
              control={control}
              render={({ field }) => (
                <Input.Root>
                  <Input.Label>Especialidade</Input.Label>
                  <Input.Description>
                    Selecione sua especialidade.
                  </Input.Description>
                  <S.SpecialtyInput
                    {...field}
                    hasError={Boolean(errors.specialty)}
                  >
                    <option value="">Selecione</option>
                    {MEDIACL_SPECIALTIES.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </S.SpecialtyInput>
                  {errors.specialty && (
                    <Input.ErrorMessageRoot>
                      <Input.ErrorMessage>
                        {errors.specialty.message}
                      </Input.ErrorMessage>
                    </Input.ErrorMessageRoot>
                  )}
                </Input.Root>
              )}
            />
          </S.SignupFieldsForm>

          <S.ForwardButtonWrapper>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </PrimaryButton>
          </S.ForwardButtonWrapper>
        </S.SignupForm>
      </Page.Content>
      <Page.Image
        alt="Doctor"
        src="https://github.com/EPS-DataMed/client-side/blob/r1/src/pages/HomePage/assets/signup.png?raw=true"
      />
    </Page.Background>
  )
}
