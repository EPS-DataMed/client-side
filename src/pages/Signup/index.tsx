import { useState } from 'react'
import * as Page from '../../components/GenericSignupLoginPage'
import { useNavigate, useLocation } from 'react-router-dom'
import { Input } from '../../components/Input'
import * as S from './styles'
import { LogoSVG } from '../../assets/logo'

import { PrimaryButton } from '../../components/PrimaryButton'
import TypingEffect from '../../components/TypingEffect'
import { ArrowRight } from '../../assets/icons'

export function Signup() {
  const location = useLocation()
  const { user: userFromNavigation } = location.state || { user: {} }
  const navigate = useNavigate()
  const sexList = ['Masculino', 'Feminino']
  const [user, setUser] = useState({
    name: userFromNavigation !== undefined ? userFromNavigation.name : '',
    email: userFromNavigation !== undefined ? userFromNavigation.email : '',
    password:
      userFromNavigation !== undefined ? userFromNavigation.password : '',
    dateOfBirth:
      userFromNavigation !== undefined ? userFromNavigation.dateOfBirth : '',
    sex: userFromNavigation !== undefined ? userFromNavigation.sex : '',
  })

  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isValid: true,
    errorMessage: '',
  })

  const [name, setName] = useState({
    isValid: true,
    errorMessage: '',
  })

  const [email, setEmail] = useState({
    isValid: true,
    errorMessage: '',
  })

  const [dateOfBirth, setDateOfBirth] = useState({
    isValid: true,
    errorMessage: '',
  })

  const [sex, setSex] = useState({
    isValid: true,
    errorMessage: '',
  })
  const [password, setPassword] = useState({
    isValid: true,
    errorMessage: '',
  })

  function isPasswordValid(password: string) {
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const length = password.length >= 8

    return hasLetter && hasNumber && length
  }

  const validateUserData = async (e: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let isValid = true
    const newNameState = { isValid: true, errorMessage: '' }
    if (user.name === undefined) {
      newNameState.isValid = false
      newNameState.errorMessage = 'Nome é obrigatório'

      e.preventDefault()
    } else {
      newNameState.isValid = true
      newNameState.errorMessage = ''
      e.preventDefault()
    }

    setName(newNameState)

    const newEmailState = { isValid: true, errorMessage: '' }
    if (user.email === undefined) {
      newEmailState.isValid = false
      newEmailState.errorMessage = 'E-mail é obrigatório'
      isValid = false
      e.preventDefault()
    } else if (!regex.test(user.email)) {
      newEmailState.isValid = false
      newEmailState.errorMessage = 'E-mail em formato inválido'
      isValid = false
      e.preventDefault()
    } else {
      newEmailState.isValid = true
      newEmailState.errorMessage = ''

      e.preventDefault()
    }

    setEmail(newEmailState)

    const newDateOfBirthState = { isValid: true, errorMessage: '' }
    if (user.dateOfBirth === undefined) {
      newDateOfBirthState.isValid = false
      newDateOfBirthState.errorMessage = 'Data de nascimento é obrigatória'
      isValid = false
      e.preventDefault()
    } else {
      newDateOfBirthState.isValid = true
      newDateOfBirthState.errorMessage = ''

      e.preventDefault()
    }

    setDateOfBirth(newDateOfBirthState)

    const newSexState = { isValid: true, errorMessage: '' }
    if (user.sex === undefined) {
      newSexState.isValid = false
      newSexState.errorMessage = 'Sexo é obrigatório'
      isValid = false
      e.preventDefault()
    } else {
      newSexState.isValid = true
      newSexState.errorMessage = ''

      e.preventDefault()
    }

    setSex(newSexState)

    const newPasswordState = { isValid: true, errorMessage: '' }
    if (user.password === undefined) {
      newPasswordState.isValid = false
      newPasswordState.errorMessage = 'Senha é obrigatória'
      isValid = false
      e.preventDefault()
    } else if (!isPasswordValid(user.password)) {
      newPasswordState.isValid = false
      newPasswordState.errorMessage =
        'Deve conter no mínimo 8 caracteres, com letras e números'
      isValid = false
      e.preventDefault()
    } else {
      newPasswordState.isValid = true
      newPasswordState.errorMessage = ''

      e.preventDefault()
    }

    setPassword(newPasswordState)

    const newConfirmPasswordState = {
      value: confirmPassword.value,
      isValid: true,
      errorMessage: '',
    }
    if (confirmPassword.value === undefined) {
      newConfirmPasswordState.isValid = false
      newConfirmPasswordState.errorMessage = 'Este campo é obrigatório'
      isValid = false
      e.preventDefault()
    } else if (!isPasswordValid(confirmPassword.value)) {
      newConfirmPasswordState.isValid = false
      newConfirmPasswordState.errorMessage =
        'Deve conter no mínimo 8 caracteres, com letras e números'
      isValid = false
      e.preventDefault()
    } else {
      newConfirmPasswordState.isValid = true
      newConfirmPasswordState.errorMessage = ''
      e.preventDefault()
    }
    if (user.password !== confirmPassword.value) {
      newPasswordState.isValid = false
      newPasswordState.errorMessage = 'As senhas estão diferentes'
      newConfirmPasswordState.isValid = false
      newConfirmPasswordState.errorMessage = 'As senhas estão diferentes'
      isValid = false
      e.preventDefault()
    }
    setConfirmPassword(newConfirmPasswordState)
    setPassword(newPasswordState)
    return isValid
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log('usernavigation: ', userFromNavigation)
    const validation = await validateUserData(e)

    console.log(name, email, password)

    if (validation) {
      navigate('/signupdoctor', { state: { user } })

      console.log(user)
    }
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

        <S.SignupProgress>
          <S.BlueProgressCircle />
          <S.GreyProgressCircle />
        </S.SignupProgress>

        <S.SignupInstruction>
          Preencha suas <b>informações básicas</b> e avance para a proxima
          etapa.
        </S.SignupInstruction>

        <S.SignupForm>
          <Input.Root>
            <Input.Label>Nome Completo *</Input.Label>
            <Input.Description>
              Informe o seu nome completo, sem abreviações.
            </Input.Description>
            <Input.Input
              type="text"
              hasError={!name.isValid}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{name.errorMessage}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>

          <Input.Root>
            <Input.Label>E-mail *</Input.Label>
            <Input.Description>Informe o seu e-mail pessoal.</Input.Description>
            <Input.Input
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              hasError={!email.isValid}
              value={user.email}
            />
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{email.errorMessage}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>

          <Input.Root>
            <Input.Label>Data de Nascimento *</Input.Label>
            <Input.Description>
              Informe sua data de nascimento.
            </Input.Description>
            <Input.Input
              type="date"
              onChange={(e) =>
                setUser({ ...user, dateOfBirth: e.target.value })
              }
              hasError={!dateOfBirth.isValid}
              value={user.dateOfBirth}
            />
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{dateOfBirth.errorMessage}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>

          <Input.Root>
            <Input.Label>Sexo *</Input.Label>
            <Input.Description>Informe seu sexo.</Input.Description>
            <S.SexInput
              hasError={!sex.isValid}
              onChange={(e) =>
                setUser({
                  ...user,
                  sex: e.target.value === 'Masculino' ? 'M' : 'F',
                })
              }
            >
              <option>{''}</option>
              {sexList.map((sex, index) => (
                <option key={index} value={sex}>
                  {sex}
                </option>
              ))}
            </S.SexInput>
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{sex.errorMessage}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>

          <Input.Root>
            <Input.Label>Senha *</Input.Label>
            <Input.Description>
              Deve conter pelo menos <b>oito caracteres</b>, com <b>letras</b> e{' '}
              <b>números</b>.
            </Input.Description>
            <Input.Input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              hasError={!password.isValid}
            />
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>{password.errorMessage}</Input.ErrorMessage>
          </Input.ErrorMessageRoot>

          <Input.Root>
            <Input.Label>Confirme sua senha *</Input.Label>
            <Input.Description>
              Confirme sua senha definida no campo acima.
            </Input.Description>
            <Input.Input
              type="password"
              onChange={(e) =>
                setConfirmPassword({
                  ...confirmPassword,
                  value: e.target.value,
                })
              }
              hasError={!confirmPassword.isValid}
            />
          </Input.Root>

          <Input.ErrorMessageRoot>
            <Input.ErrorMessage>
              {confirmPassword.errorMessage}
            </Input.ErrorMessage>
          </Input.ErrorMessageRoot>
        </S.SignupForm>

        <S.ForwardButtonWrapper>
          <PrimaryButton onClick={handleSubmit}>
            Avançar <ArrowRight />
          </PrimaryButton>
        </S.ForwardButtonWrapper>
      </Page.Content>

      <Page.Image alt="Doctor" src="src/pages/HomePage/assets/signup.png" />
    </Page.Background>
  )
}
