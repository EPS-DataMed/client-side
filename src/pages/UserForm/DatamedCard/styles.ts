import styled from 'styled-components'

const commonStyles = `
  border: 1px solid black;
  border-radius: 16px;
  padding: 24px;
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 50px;
  width: 794px;
  height: 1123px;
  box-sizing: border-box;
`

export const Card = styled.div`
  ${commonStyles}
  display: flex;
  flex-direction: column;
  gap: 20px;

  * {
    font-family: ${({ theme }) => theme.fonts.tertiary};
  }
`

export const HealthGraph = styled.div`
  ${commonStyles}
  display: flex;

  tspan {
    font-size: 12px;
  }

  .score-container {
    tspan {
      font-size: 32px;
    }
  }
`
