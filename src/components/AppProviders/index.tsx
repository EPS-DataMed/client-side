import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from '../../styles/themes/default'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MockUserProvider } from './contexts/MockUserContext'

interface AppProvidersProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <MockUserProvider>{children}</MockUserProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
