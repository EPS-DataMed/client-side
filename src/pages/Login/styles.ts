import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'


export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 28vw;
    gap: ${({ theme }) => theme.space[4]};
`

export const RegisterArea = styled.div`
    margin-top: ${({ theme }) => theme.space[8]};

`

export const RegisterPhrase = styled.span`
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.neutral900};
`

export const Link = styled.a`
    font-size: ${({ theme }) => theme.fontSizes.md};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.blue440};
    &:hover {
        
        color: ${({ theme }) => darkenColor(theme.colors.blue440, 0.2)};
        text-decoration: underline;
        cursor: pointer;
    }
`
