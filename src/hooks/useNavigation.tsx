import { useNavigate } from 'react-router-dom'

interface NavigationOptions {
  state?: object
  replace?: boolean
}

const useNavigation = () => {
  const navigate = useNavigate()

  const goTo = (path: string, options?: NavigationOptions) => {
    navigate(path, options)
  }

  return goTo
}

export default useNavigation
