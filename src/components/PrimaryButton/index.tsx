import React from 'react'
import * as S from './styles'

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export const PrimaryButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  ...props
}) => {
  return (
    <S.StyledButton variant={variant} {...props}>
      {children}
    </S.StyledButton>
  )
}
