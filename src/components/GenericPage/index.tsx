import { css, styled } from 'styled-components'
import { LogoSVG } from '../../assets/logo'
import { ProfileButton } from '../ProfileButton'
import { PrimaryButton } from '../PrimaryButton'
import { Logout } from '../../assets/icons/logout'
import useNavigation from '../../hooks/useNavigation'

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

export const HeaderOptions = styled.div`
  display: flex;
  height: 35px;
  gap: ${({ theme }) => theme.space[4]};
`

export const Header = styled.header`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  margin-bottom: ${({ theme }) => theme.space[2]};
  justify-content: space-between;
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
  text-align: justify;
`

export const LogoTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.blue500};
  cursor: pointer;
`

type LogoutButtonProps = {
  action: () => void
  dataTestId?: string
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ action, dataTestId }) => (
  <PrimaryButton variant="red" onClick={action} data-testid={dataTestId}>
    <Logout />
    <p>Sair</p>
  </PrimaryButton>
)

const CustomLogoSVG: React.FC = () => {
  const navigateTo = useNavigation()

  const handleLogoClick = () => {
    navigateTo('/home')
  }

  return <LogoSVG onClick={handleLogoClick} />
}

interface LogoTitleComponentProps {
  children: React.ReactNode
}

const LogoTitleComponent: React.FC<LogoTitleComponentProps> = ({
  children,
}) => {
  const navigateTo = useNavigation()

  return <LogoTitle onClick={() => navigateTo('/home')}>{children}</LogoTitle>
}

export const GenericPage = {
  Root,
  Divider,
  Title,
  Description,
  LogoTitle: LogoTitleComponent,
  Logo: CustomLogoSVG,
  Header,
  HeaderOptions,
  ProfileButton,
  LogoutButton,
}
