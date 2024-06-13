/* eslint-disable prettier/prettier */
import styled, { css } from 'styled-components'
import {
  fadeInAnimation,
  rotateAnimation,
  slideAnimation,
  verticalAnimation,
} from '../../../../styles/animations'
import { Skeleton } from '../../../../components/Skeleton'

interface ContainerProps {
  enabled: boolean
  typeBox?: 'load_success' | 'list_tests'
}

const loadSuccesStyle = css`
  border: 2px solid ${({ theme }) => theme.colors.green500};

  span {
    position: relative;
    bottom: 10px;
  }

`

const listTestsStyle = css`
  border: 2px solid ${({ theme }) => theme.colors.green500};
`

const BOX_OPTIONS = {
  load_success: loadSuccesStyle,
  list_tests: listTestsStyle,
}

function chooseOptionBox(option: 'load_success' | 'list_tests' ) {
  return BOX_OPTIONS[option] || null
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xs};
  transition: background-color 1s ease-in-out;
  transition: border-color 1s ease-in-out;

  background-color: ${({ enabled, theme }) =>
    enabled ? theme.colors.neutral100 : theme.colors.neutral50};

  border: 2px solid ${({ enabled, theme }) =>
    enabled ? theme.colors.blue500 : theme.colors.neutral400};
  height: 360px;
  width: 355px;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[10]};

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeInAnimation} 0.5s linear;

  ${({typeBox}) => typeBox && chooseOptionBox(typeBox)}
`

interface DescriptionProps {
  enabled: boolean
}

export const Description = styled.span<DescriptionProps>`
  color: ${({ theme, enabled }) => !enabled ? theme.colors.neutral500: theme.colors.neutral900};
  width: 80%;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

interface AnimationDivProps {
  animation: 'slide' | 'vertical' | 'rotate' | 'fadeIn'
  typeAnimation: 'infinite' | 'linear' | 'ease-in-out'
  timeAnimation: string
}

const ANIMATIONS_OPTIONS = {
  slide: slideAnimation,
  vertical: verticalAnimation,
  rotate: rotateAnimation,
  fadeIn: fadeInAnimation
}

function chooseAnimationOption(option: 'slide' | 'vertical' | 'rotate' | 'fadeIn') {
  return ANIMATIONS_OPTIONS[option] || null
}

export const AnimationDiv = styled.div<AnimationDivProps>`
  animation: ${({ animation }) => chooseAnimationOption(animation)} ${({ timeAnimation }) => timeAnimation} ${({ typeAnimation }) => typeAnimation};
`

export const SkeletonContainer = styled(Skeleton)`
  border-radius: ${({ theme }) => theme.radii.xs};
  transition: background-color 1s ease-in-out;
  transition: border-color 1s ease-in-out;

  background-color: ${({ theme }) => theme.colors.neutral50};

  border: 2px solid ${({ theme }) => theme.colors.neutral400};
  height: 360px;
  width: 355px;

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeInAnimation} 0.5s linear;
`