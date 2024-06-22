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
import { UserProvider } from './contexts/UserContext'
import { UserForm } from './pages/UserForm'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { EditUser } from './pages/EditUser'
import { ManagerUsers } from './pages/ManagerUsers'
import { DependentConfirm } from './pages/DependentConfirm'
import ProtectedRoute from './components/ProtectedRoute'
import { RecoverPassword } from './pages/RecoverPassword'
import { ChangePassword } from './pages/ChangePassword'

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
                <Route path="/recover" element={<RecoverPassword />} />
                <Route path="/change" element={<ChangePassword />} />
                <Route path="/confirm" element={<DependentConfirm />} />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/submission/:path/:dependentId"
                  element={
                    <ProtectedRoute>
                      <Submission />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/form/:dependentId"
                  element={
                    <ProtectedRoute>
                      <UserForm />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/manager/users"
                  element={
                    <ProtectedRoute>
                      <ManagerUsers />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Login />} />
                <Route path="/editUser" element={<EditUser />} />
              </Routes>
            </SubmissionTestProvider>
          </UserProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
