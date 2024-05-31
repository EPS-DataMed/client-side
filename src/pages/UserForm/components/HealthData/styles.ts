import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: 2%;
`

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.neutral400};
`
