import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

interface FullHeightProps {
  hasFullHeight: boolean
}

export const Animation = styled.div<FullHeightProps>`
  ${({ hasFullHeight }) =>
    !hasFullHeight &&
    css`
      height: 60vh;
    `}

  ${({ hasFullHeight }) =>
    hasFullHeight &&
    css`
      transform: scale(0.8);
    `}
`

export const NotFoundText = styled.span<FullHeightProps>`
  position: relative;
  bottom: ${({ hasFullHeight }) => (!hasFullHeight ? '70px' : '80px')};
  color: white;
  font-style: italic;
  font-size: 14px;
  text-align: center;
`
