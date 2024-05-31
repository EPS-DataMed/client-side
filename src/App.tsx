import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'
import { HomePage } from './pages/HomePage'
import { Submission } from './pages/Submission'
import { SubmissionTestProvider } from './contexts/SubmissionTestContext'
import { UserForm } from './pages/UserForm'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { SignupDoctor } from './pages/SignupDoctor'

export const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Router>
          <SubmissionTestProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/submission" element={<Submission />} />
              <Route path="/form" element={<UserForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signupdoctor" element={<SignupDoctor />} />
            </Routes>
          </SubmissionTestProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
