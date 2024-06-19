import * as SelectRadix from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { styled } from 'styled-components'

interface TriggerProps {
  hasError?: boolean
}

const Trigger = styled(SelectRadix.Trigger)<TriggerProps>`
  display: flex;
  padding: 0 16px;
  align-items: center;
  gap: 8px;
  height: 35px;
  background-color: inherit;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, hasError }) =>
      hasError ? theme.colors.red500 : theme.colors.neutral500};
  outline: none;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutral700};
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`

const Content = styled(SelectRadix.Content)`
  padding: 0;
  border-radius: ${({ theme }) => theme.radii.xs};
  background: ${({ theme }) => theme.colors.neutral};
  max-height: 10rem;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 99999999;
  box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
`

const Item = styled(SelectRadix.Item)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.neutral700};
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 351px;
  position: relative;
  user-select: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral};
    background: ${({ theme }) => theme.colors.blue500};
  }

  &[data-disabled] {
    color: ${({ theme }) => theme.colors.neutral400};
    pointer-events: none;
  }
`

const ItemText = styled(SelectRadix.ItemText)`
  width: 100%;
`

export const Select = {
  Root: SelectRadix.Root,
  Trigger,
  Value: SelectRadix.Value,
  Icon: SelectRadix.Icon,
  Portal: SelectRadix.Portal,
  Group: SelectRadix.Group,
  Content,
  Viewport: SelectRadix.Viewport,
  Item,
  ItemText,
  ChevronDownIcon,
  ChevronUpIcon,
}
