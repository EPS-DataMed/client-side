import { styled } from 'styled-components'

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.neutral400};
  padding: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[2]};
`


export const SectionTitle = styled.h2`
  
  font-weight: bold;
`
export const SectionDescription = styled.h4`
  font-weight: normal;
`

export const FormChangePassword = styled.form`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.space[4]};
`

export const ButtonWrapper = styled.div`
  heigth: 35px;
`