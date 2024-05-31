/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import {
  fadeInAnimation,
  rotateAnimation,
  slideAnimation,
  verticalAnimation,
} from '../../../../styles/animations'

interface ContainerProps {
  enabled: boolean
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;

  border-radius: ${({ theme }) => theme.radii.xs};
  transition: background-color 1s ease-in-out;
  background-color: ${({ enabled, theme }) =>
    enabled ? theme.colors.neutral100 : theme.colors.neutral50};
  height: 360px;
  width: 346px;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[10]};

  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeInAnimation} 0.5s linear;
`
export const Description = styled.div`
  color: ${({ theme }) => theme.colors.neutral500};
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
