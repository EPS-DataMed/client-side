import { Control, FieldErrors } from 'react-hook-form'
import { SignupFormData } from '../schema'

export enum Sex {
  Masculino = 'Masculino',
  Feminino = 'Feminino',
}

export interface StepProps {
  control: Control<SignupFormData>
  errors: FieldErrors<SignupFormData>
  setStep: (step: number) => void
  loading?: boolean
  handleNextStep?: () => void
  isMedicalInfoFilled?: boolean
}
