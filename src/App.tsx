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
import { EditUser } from './pages/EditUser'
import { UserProvider } from './contexts/UserContext'
import ProtectedRoute from './components/ProtectedRoute'

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
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/submission"
                  element={
                    <ProtectedRoute>
                      <Submission />
                    </ProtectedRoute>
                  }
                />
                <Route path="/form" element={<UserForm />} />
                <Route path="*" element={<Login />} />
                <Route path="/edituser" element={<EditUser/>}/>
              </Routes>
            </SubmissionTestProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
