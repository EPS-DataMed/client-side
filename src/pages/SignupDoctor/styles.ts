import { styled, css } from 'styled-components'
import { darkenColor } from '../../utils/colors'


export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 29vw;
    gap: ${({ theme }) => theme.space[4]};
    heigth: 50vh;
    
    
    
`


export const SignupProgress = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.space[2]};
    padding: ${({ theme }) => theme.space[4]};
`
export const BlueProgressCircle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.blue500};
`


export const SignupInstruction = styled.p`
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.neutral600};
    width: 29vw;
    
`

export const FinishButtonWrapper = styled.div`
    width: 29vw;
    display: flex;
    padding-top: ${({ theme }) => theme.space[4]};
    gap: 0.5rem;
    justify-content: center;
`
interface SelectProps{
    hasError?: boolean;
}

export const SpecialtyInput = styled.select<SelectProps>`
    width: 29vw;
    height: 35px;
    border-radius: ${({ theme }) => theme.radii.md};
    border: 1px solid ${({ theme }) => theme.colors.neutral600};
    ${({ hasError, theme }) =>
        hasError &&
        css`
          border: 1px solid ${theme.colors.red500};
        `}
`
