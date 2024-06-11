import styled from 'styled-components'

export const Section = styled.div`
  margin-top: 10px;
`

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.tertiary};
  font-weight: bold;
`

export const Content = styled.label`
  font-family: ${({ theme }) => theme.fonts.tertiary};
`
