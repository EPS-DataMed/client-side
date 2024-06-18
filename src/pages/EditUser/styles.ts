import { styled } from 'styled-components'



export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space[2]};
  
`


export const WrapperLogoAndLogoTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
`

export const BreadcrumbWrapper = styled.div`
  padding-top: ${({ theme }) => theme.space[2]};
  padding-bottom: ${({ theme }) => theme.space[2]};

`

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.space[4]};
  padding-bottom: ${({ theme }) => theme.space[8]};
  gap: ${({ theme }) => theme.space[4]};
  height: 100%;
  
`


export const ButtonWrapper = styled.div`
  heigth: 35px;
`


export const Section = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: solid 1px ${({ theme }) => theme.colors.neutral400};
  padding: ${({ theme }) => theme.space[4]};
  gap: ${({ theme }) => theme.space[2]};
`

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


export const UserDataInputs = styled.form`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.space[4]};
`

export const DeleAccForm = styled.form`
  display: flex;
  align-items: end;
  gap: ${({ theme }) => theme.space[4]};
`

