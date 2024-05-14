export interface ButtonProps {
  id: 'back' | 'delete' | string
  label: string
  showButton?: boolean
  variant?: 'primary' | 'secondary'
  action?: (id?: string) => void
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset' | undefined
  size?: 'md' | 'sm' | 'lg'
  backgroundColor?: string
  borderColor?: string
  color?: string
  icon?: JSX.Element
}

export type DialogItemToRender = {
  title?: string | JSX.Element
  component?: string | JSX.Element
  description?: string | JSX.Element
  buttonConfig?: ButtonProps[]
  hideCloseButton?: boolean
  marginTopWrapperButton?: string | number
  width?: string | number
  spaceAfterTitle?: string | number
}

export interface DialogConfig {
  [key: string]: {
    title?: string | JSX.Element
    component?: string | JSX.Element
    description?: string | JSX.Element
    buttonConfig?: ButtonProps[]
    hideCloseButton?: boolean
    marginTopWrapperButton?: string | number
    width?: string | number
  }
}
