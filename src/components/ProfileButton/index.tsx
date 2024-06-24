import { useUserContext } from '../../contexts/UserContext'
import useNavigation from '../../hooks/useNavigation'
import { hasObjectValidKeys } from '../../interfaces/typeGuards'
import { useListUserInfoRepository } from './repositories/useListUserInfoRepository'
import * as S from './styles'

export function ProfileButton() {
  const navigateTo = useNavigation()

  const { user } = useUserContext()

  function handleNavigateToProfile() {
    navigateTo('/editUser')
  }

  const { isListUserInfoLoading } = useListUserInfoRepository()
  const isUserExists = hasObjectValidKeys(user)

  return (
    <S.ProfileCircle
      data-testid="profile-button"
      onClick={handleNavigateToProfile}
    >
      {!isListUserInfoLoading && isUserExists ? (
        <p>{user?.full_name[0]}</p>
      ) : (
        <S.SkeletonProfileCircle data-testid="skeleton-profile-circle" />
      )}
    </S.ProfileCircle>
  )
}
