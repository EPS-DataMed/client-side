import { GenericPage } from '../../components/GenericPage'
import { PrimaryButton } from '../../components/PrimaryButton'
import { ButtonsAndProfile } from '../../components/ButtonsAndProfile'
import { ProfileCircle } from '../../components/ProfileCircle'
import * as S from './styles'
import { Pen } from '../../assets/icons/pen'
import { Logout } from '../../assets/icons/logout'
import InputField from '../../components/Input/InputField'
import { EditFormData, EditSchema } from './schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller } from 'react-hook-form'
import { Input } from '../../components/Input'
import { SelectConfig } from '../../components/Select/SelectConfig'
import { Sex } from '../Signup/interfaces'

export function EditUser(){

    const { control, handleSubmit , formState: { errors } } = useForm<EditFormData>({
        resolver: zodResolver(EditSchema),
        defaultValues: {
            name: '',
            email: '',
            dateOfBirth: '',
            sex: ''

        },
      })


    return (
        <>
            <GenericPage.Root hasNoScrollbar>
                <S.Header>
                    <S.WrapperLogoAndLogoTitle>
                        <GenericPage.Logo />
                        <GenericPage.LogoTitle>DataMed</GenericPage.LogoTitle>
                    </S.WrapperLogoAndLogoTitle>

                    <ButtonsAndProfile>
                        <ProfileCircle>
                            <p>D</p>
                        </ProfileCircle>

                        <PrimaryButton>
                            <Pen />
                            <p>Paciente</p>
                        </PrimaryButton>

                        <PrimaryButton variant="red">
                            <Logout />
                            <p>Sair</p>
                        </PrimaryButton>

                    </ButtonsAndProfile>
                </S.Header>

                <GenericPage.Divider />

                <S.MainContent>
                    <S.Section>
                        <S.SectionTitle>Informações Pessoais</S.SectionTitle>
                        <S.SectionDescription>Visualize suas informações pessoais</S.SectionDescription>
                        <GenericPage.Divider/>
                        <S.UserDataInputs>
                            <InputField
                                label="Nome"
                                name="name"
                                control={control}
                                description=""
                                required
                            />
                            <InputField
                                label="E-mail"
                                name="email"
                                control={control}
                                description=""
                                required
                            />
                            <Controller
                                name="sex"
                                control={control}
                                render={({ field }) => (
                                    <Input.Root>
                                    <Input.Label>Sexo *</Input.Label>
                                    <SelectConfig
                                        items={[
                                        { value: Sex.Masculino, label: 'Masculino' },
                                        { value: Sex.Feminino, label: 'Feminino' },
                                        ]}
                                        hasError={!!errors.sex?.message}
                                        handleValueChange={field.onChange}
                                        defaultValue={field.value}
                                    />
                                    {errors.sex && (
                                        <Input.ErrorMessageRoot>
                                        <Input.ErrorMessage>{errors.sex.message}</Input.ErrorMessage>
                                        </Input.ErrorMessageRoot>
                                    )}
                                    </Input.Root>
                                )}
                            />


                            <InputField
                                label="Data de nascimento"
                                name="dateOfBirth"
                                control={control}
                                description=""
                                required
                            />
                        </S.UserDataInputs>
                    </S.Section>
                </S.MainContent>

                <GenericPage.Divider />

            </GenericPage.Root>
        
        
        </>



    )
}