import styled from 'styled-components'
import { darkenColor } from '../../../../utils/colors'

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${({ theme }) => theme.space[4]};

  div {
    width: 100% !important;
  }
`

export const WrapperButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[2]};
  flex: 1;

  margin-top: ${({ theme }) => theme.space[2]};
  width: 100%;
`

export const MessageArea = styled.div`
  margin-top: ${({ theme }) => theme.space[6]};
`

export const MessagePhrase = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.neutral900};
`

export const Link = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.blue500};

  &:hover {
    color: ${({ theme }) => darkenColor(theme.colors.blue500, 0.1)};
    cursor: pointer;
  }
`
