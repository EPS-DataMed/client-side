import styled, { css } from 'styled-components'

const hasVerticalOrientationStyle = css`
  flex-direction: column;
  flex: 1;
  width: 100%;
  gap: 20px;
`

interface SectionContainerProps {
  hasVerticalOrientation: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.neutral400};
  border-radius: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[6]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  gap: ${({ theme }) => theme.space[4]};
`

export const SectionWrapperInputs = styled.section<SectionContainerProps>`
  display: flex;
  justify-content: space-between;
  gap: 2%;

  ${({ hasVerticalOrientation }) =>
    hasVerticalOrientation && hasVerticalOrientationStyle}
`

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
`

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.neutral400};
`
