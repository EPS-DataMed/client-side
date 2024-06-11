import styled from 'styled-components'

export const MetricContainer = styled.div`
  * {
    font-family: ${({ theme }) => theme.fonts.tertiary};
  }
  display: flex;
  flex-direction: column;

  gap: 8px;

  span {
    font-weight: bold;
  }
`

export const Wrapper = styled.div`
  display: flex;
  gap: 4px;
`
