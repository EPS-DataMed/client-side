import { ComponentProps, ElementType } from 'react'

import styled, { css } from 'styled-components'
import { RoundCloseIcon, SearchIcon } from './assets'
import { darkenColor } from '../../utils/colors'
import { fadeInAnimation } from '../../styles/animations'
import { DeleteIcon } from './assets/delete'

const Root = styled.div`
  position: relative;
  width: 100%;
`

interface OptionCountProps {
  optionsCount: 'fourOrMore' | 'lessThanFour'
}

const ScrollContainer = styled.div<OptionCountProps>`
  position: absolute;
  box-sizing: border-box;
  top: 38px;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);

  ${(props) =>
    props.optionsCount === 'fourOrMore' &&
    css`
      padding: 0px 16px 0 0;
    `}

  ${(props) =>
    props.optionsCount === 'lessThanFour' &&
    css`
      padding: 0;
    `}
`

const OptionsList = styled.ul<OptionCountProps>`
  list-style-type: none;
  position: relative;
  padding: 0;
  margin: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.neutral};
  max-height: 156px;
  overflow-y: auto;
  width: 100%;
  position: relative;
  scroll-padding-top: 50px !important;
  animation: ${fadeInAnimation} 0.3s linear forwards;

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.blue500};
    border-radius: ${({ theme }) => theme.radii.full};
    border: 3px solid ${({ theme }) => darkenColor(theme.colors.blue500, 0.3)};
    background-clip: content-box;
  }

  &::-webkit-scrollbar {
    width: 16px;
    cursor: pointer;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral500};
    border-radius: ${({ theme }) => theme.radii.full};
    border: 5px solid transparent;
    background-clip: content-box;
    transition: background 0.5s ease, border-radius 0.5s ease, border 0.5s ease;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.neutral500};
    border-style: solid;
    border-color: transparent;
    border-width: 8px 7px 8px 7px;
    background-clip: padding-box;
  }

  ${(props) =>
    props.optionsCount === 'fourOrMore' &&
    css`
      margin-right: -20px;
      padding-right: 8px;
    `}
`

const OptionItem = styled.div<OptionCountProps>`
  display: flex;
  position: relative;
  color: ${({ theme }) => theme.colors.neutral900};
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.1s ease-in, color 0.1s ease-in;
  font-size: ${({ theme }) => theme.fontSizes.sm};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: transparent;
    transition: background-color 0.1s ease-in, width 0.1s ease-in;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue500};
    color: ${({ theme }) => theme.colors.neutral};
    padding-right: 0px;

    &::before {
      background-color: ${({ theme }) =>
        darkenColor(theme.colors.blue500, 0.3)};
    }
  }

  ${(props) =>
    props.optionsCount === 'fourOrMore' &&
    css`
      border-right: 1px solid #acacb5;
    `}
`

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  left: 14px;
  top: 9px;
`

const RoundCloseIconStyled = styled(RoundCloseIcon)`
  position: absolute;
  top: 8px;
  right: 16px;
  cursor: pointer;
`

const NonBoldText = styled.span`
  color: ${({ theme }) => theme.colors.neutral600};
`

const DeleteIconStyled = styled(DeleteIcon)``

export const Searchbar = {
  Root,
  ScrollContainer,
  OptionsList,
  OptionItem,
  SearchIconStyled,
  RoundCloseIconStyled,
  NonBoldText,
  DeleteIconStyled,
}

export interface SearchBarProps extends ComponentProps<typeof Root> {
  as?: ElementType
}

export { useSearchbarQuery } from './hooks/useSearchbarQuery'
export { SearchbarConfiguration } from './components/SearchbarConfiguration'
export type { SearchbarConfigurationProps } from './components/SearchbarConfiguration'
