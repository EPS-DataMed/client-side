import styled from 'styled-components'

export const PersonalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const Name = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 900;
`

export const Age = styled.span`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`

export const MetricsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
