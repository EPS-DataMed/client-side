import useNavigation from '../../hooks/useNavigation'
import * as S from './styles'

export function ProfileButton({ letter }: { letter: string }) {
  const navigateTo = useNavigation()

  function handleNavigateToProfile() {
    navigateTo('profile')
  }

  return (
    <S.ProfileCircle onClick={handleNavigateToProfile}>
      <p>{letter}</p>
    </S.ProfileCircle>
  )
}
