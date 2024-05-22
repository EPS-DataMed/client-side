import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'


export const SignupForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 29vw;
    gap: ${({ theme }) => theme.space[4]};
    heigth: 55vh;
    overflow-y: scroll;
    padding-right: ${({ theme }) => theme.space[2]};
    
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

export const GreyProgressCircle = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.neutral300};
`
export const SignupInstruction = styled.p`
    margin: 0;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ theme }) => theme.colors.neutral600};
    width: 29vw;
`

export const ForwardButtonWrapper = styled.div`
    width: 29vw;
    display: flex;
    justify-content: center;
    
`