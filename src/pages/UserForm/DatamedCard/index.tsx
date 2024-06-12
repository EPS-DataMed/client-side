import React from 'react'
import { calculateHealthScore } from 'hgraph-react'
import { PersonalInfoSection } from './components/PersonalInfoSection'
import { DetailSection } from './components/DetailSection'
import * as S from './styles'
import { HGraphWrapper } from '../HGraphWrapper'
import useHGraphData from '../hooks/useHGraphData'
import { User } from '../interfaces'

interface DatamedCardProps {
  user: User
  componentRef: React.MutableRefObject<HTMLDivElement | null>
}

const DatamedCard: React.FC<DatamedCardProps> = ({ user, componentRef }) => {
  const hGraphData = useHGraphData(user)

  const healthScore = Math.round(calculateHealthScore(hGraphData))

  return (
    <S.Container ref={componentRef}>
      <S.Card>
        <PersonalInfoSection user={user} />
      </S.Card>
      <S.HealthGraph>
        <HGraphWrapper data={hGraphData} score={healthScore} />
        <DetailSection
          title="HISTÓRICO FAMILIAR"
          content={user.familyHistory}
        />
      </S.HealthGraph>
    </S.Container>
  )
}

export default DatamedCard
