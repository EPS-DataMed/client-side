import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'

interface AppProvidersProps {
  children: ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return <ThemeProvider theme={defaultTheme}>{children}</ThemeProvider>
}

export default AppProviders
