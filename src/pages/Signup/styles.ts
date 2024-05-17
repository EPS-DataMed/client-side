import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'


export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 28vw;
    gap: ${({ theme }) => theme.space[4]};
    heigth: 50vh;
    overflow-y: scroll;
    padding: ${({ theme }) => theme.space[4]};
    
`


export const SignupProgress = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.space[2]};
`
export const BlueProgressCircle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.blue500};
`

export const GreyProgressCircle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.neutral300};
`
export const SignupInstruction = styled.p`
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.neutral600};
    width: 28vw;
    padding:${({ theme }) => theme.space[4]};
`

export const ForwardButtonWrapper = styled.div`
    width: 28vw;
    display: flex;
    justify-content: center;
    background-color: blue;
`