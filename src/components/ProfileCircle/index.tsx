import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'

export const ProfileCircle = styled.div`
    color: ${({ theme }) => theme.colors.neutral};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 37px;
    width: 37px;
    background-color: ${({ theme }) => theme.colors.blue440};
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    &:hover{
        cursor: pointer;
        background-color: ${({ theme }) => darkenColor(theme.colors.blue440, 0.2)};
    }

`