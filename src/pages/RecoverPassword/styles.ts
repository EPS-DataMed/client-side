import { styled } from 'styled-components'
import { darkenColor } from '../../utils/colors'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 365px;
  height: 200px;
  gap: ${({ theme }) => theme.space[2]};
`

export const RegisterArea = styled.div`
  margin-top: ${({ theme }) => theme.space[8]};
`

export const RegisterPhrase = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutral900};
`

export const Link = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.blue500};

  &:hover {
    color: ${({ theme }) => darkenColor(theme.colors.blue500, 0.1)};
    cursor: pointer;
  }
`

export const Slogan = styled.p`
  margin: 0;
  width: 365px;
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  margin-bottom: ${({ theme }) => theme.space[6]};
`

export const WrapperButtonAndLink = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`
