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
import { UserProvider } from './contexts/UserContext'
// import ProtectedRoute from './components/ProtectedRoute'
import { ManagerUsers } from './pages/ManagerUsers'
import { DependentConfirm } from './pages/DependentConfirm'

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
          <UserProvider>
            <SubmissionTestProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/confirm" element={<DependentConfirm />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/submission/:path" element={<Submission />} />
                <Route path="/form" element={<UserForm />} />
                <Route path="/manager/users" element={<ManagerUsers />} />
                <Route path="*" element={<Login />} />
              </Routes>
            </SubmissionTestProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
