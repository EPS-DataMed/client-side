import { useMemo } from 'react'
import { User } from '../interfaces'
import { mapUserToHGraphData } from '../utils'

const useHGraphData = (user: User) => {
  return useMemo(() => mapUserToHGraphData(user), [user])
}

export default useHGraphData
