import { css, styled } from 'styled-components'
import { LogoSVG } from '../../assets/logo'

interface RootProps {
  hasNoScrollbar?: boolean
}

const hasNoScrollbarStyle = css`
  height: 100vh;
`

export const Root = styled.div<RootProps>`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: ${({ theme }) => theme.space[19]} ${({ theme }) => theme.space[27]};
  ${({ hasNoScrollbar }) => hasNoScrollbar && hasNoScrollbarStyle}
`

export const Divider = styled.div`
  width: 100%;
  height: 0.5px;
  background-color: ${({ theme }) => theme.colors.neutral400};
`

export const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: bold;
`

export const Description = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.md};
`

export const LogoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue500};
`

export const GenericPage = {
  Root,
  Divider,
  Title,
  Description,
  LogoTitle,
  Logo: LogoSVG,
}
