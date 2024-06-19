import { css, styled } from 'styled-components'
import { lightenColor } from '../../utils/colors'
import { PrimaryButton } from '../../components/PrimaryButton'
import { Skeleton } from '../../components/Skeleton'

export const WrapperLogoAndLogoTitle = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  align-items: center;
`

export const WrapperHeaderAndBreadcrumb = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.space[2]};
`

export const Header = styled.header`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  justify-content: space-between;
`

export const MainContent = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space[4]};
`

export const WrapperPageInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
`

export const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: normal;
`

export const TableContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr) 3fr;
  margin-top: 24px;
`

export const TableContentContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 2fr) 3fr;
  overflow-y: auto;
  overflow-x: hidden;
  height: 28rem;
  margin: 0 0 60px 0;
  @media (min-width: 1604px) {
    overflow: hidden;
    height: auto;
  }
`

export const WrapperStatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

interface StatusIndicatorProps {
  status: 'uninitiated' | 'concluded'
}

const STATUS_STYLES = {
  uninitiated: css`
    background-color: ${({ theme }) => theme.colors.red500};
  `,
  concluded: css`
    background-color: ${({ theme }) => theme.colors.green500};
  `,
}

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  border-radius: ${({ theme }) => theme.radii.full};
  height: 8px;
  width: 8px;
  ${({ status }) => STATUS_STYLES[status]}
`

interface TableCellProps {
  hasGap?: boolean
}

export const TableTitleCell = styled.time<TableCellProps>`
  margin-top: 4px;
  background-color: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.neutral900};
  padding: 24px 0;
  line-height: 2.4;
  padding-left: ${({ hasGap }) => (hasGap ? '0px' : '40px')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

export const TableCell = styled.tr<TableCellProps>`
  margin-top: 4px;
  background-color: ${({ theme }) => theme.colors.neutral};
  color: ${({ theme }) => theme.colors.neutral900};
  padding: 24px 0;
  line-height: 2.4;
  padding-left: ${({ hasGap }) => (hasGap ? '0px' : '120px')};

  ${({ hasGap }) =>
    hasGap &&
    css`
      display: flex;
      gap: 8px;
    `}
`

export const TableHeader = styled.thead<TableCellProps>`
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.blue500};
  padding: 24px 0;
  color: ${({ theme }) => theme.colors.neutral};
  padding-left: 120px;

  &:first-child {
    border-top-left-radius: 8px;
    padding-left: 40px;
  }

  &:nth-child(4) {
    border-top-right-radius: 8px;
  }
`

interface ButtonStyledProps {
  label?: string
}

export const ButtonStyled = styled(PrimaryButton)<ButtonStyledProps>`
  background-color: inherit;
  text-align: center !important;
  color: ${({ theme }) => theme.colors.blue500} !important;
  border: 1px solid ${({ theme }) => theme.colors.blue500} !important;
  font-weight: ${({ theme }) => theme.fontWeights.bold} !important;

  ${({ label }) =>
    label === 'Excluir' &&
    css`
      color: ${({ theme }) => theme.colors.red500} !important;
      border: 1px solid ${({ theme }) => theme.colors.red500} !important;
    `}

  &:hover {
    background-color: inherit !important;
    color: ${({ theme }) => theme.colors.blue500} !important;
    font-weight: ${({ theme }) => theme.fontWeights.bold} !important;
    border: 1px solid ${({ theme }) => lightenColor(theme.colors.blue500, 0.2)} !important;

    ${({ label }) =>
      label === 'Excluir' &&
      css`
        color: ${({ theme }) => theme.colors.red500} !important;
        border: 1px solid
          ${({ theme }) => lightenColor(theme.colors.red500, 0.2)} !important;
      `}
  }
`

export const WrapperButton = styled.div`
  display: flex;
  margin-left: auto;
  gap: 8px;
  margin-right: 24px;
`

export const SkeletonButton = styled(Skeleton)`
  height: 35px;
  width: 104px;
  border-radius: 4px;
`

export const SkeletonTitle = styled(Skeleton)`
  height: 49px;
  width: 28%;
  border-radius: 4px;
`

export const SkeletonDescription = styled(Skeleton)`
  height: 21.5px;
  width: 80%;
  border-radius: 4px;
`
export const SkeletonBreadcrumbs = styled(Skeleton)`
  height: 19px;
  width: 20%;
  border-radius: 4px;
`
