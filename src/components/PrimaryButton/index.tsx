import React from 'react'
import * as S from './styles'

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'red' | 'success'
}

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  ...rest
}) => {
  return (
    <S.StyledButton variant={variant} {...rest}>
      {children}
    </S.StyledButton>
  )
}
