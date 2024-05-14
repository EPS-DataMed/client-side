import styled from 'styled-components'

export const WrapperTitle = styled.div``

export const WrapperActionButtons = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  gap: 4px;

  button {
    width: 100% !important;
  }

  @media screen and (max-width: 768px) {
    button {
      width: 100% !important;
    }
  }
`
