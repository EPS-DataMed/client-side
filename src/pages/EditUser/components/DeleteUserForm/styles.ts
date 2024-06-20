import styled from 'styled-components'

export const DeleteSection = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.red500};
  padding: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[2]};
`

export const SectionTitle = styled.h2`
  font-weight: bold;
`
export const SectionDescription = styled.h4`
  font-weight: normal;
`

export const DeleAccForm = styled.form`
  display: flex;
  position: relative;
  gap: ${({ theme }) => theme.space[4]};
`

export const ButtonWrapper = styled.div`
  position: relative;
  margin-top: 22px;
`

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;  
  gap: ${({ theme }) => theme.space[2]};
`
