import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

const StyledCheckbox = styled.div<{ checked: boolean }>`
  display: inline-block;
  width: ${(props) => props.theme.space[4]};
  height: ${(props) => props.theme.space[4]};
  background: ${(props) => props.theme.colors.neutral50};
  border-radius: ${(props) => props.theme.radii.xs};
  transition: all 150ms;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.neutral400};
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.blue440};
  }
  ${(props) =>
    props.checked &&
    `
    &:after {
      content: '✔';
      display: block;
      position: relative;
      left: 3.2px;
      top: -1px;
      font-size: ${props.theme.fontSizes.xxs};
      color: ${props.theme.colors.neutral900};
    }
  `}
`

const CheckboxLabel = styled.label`
  margin-left: ${(props) => props.theme.space[2]};
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.primary};
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.neutral700};
`

export const PrivacyLink = styled.span`
  color: ${(props) => props.theme.colors.blue500};
  text-decoration: underline;
  cursor: pointer;
`

interface CheckboxProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string | JSX.Element
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <CheckboxContainer>
    <HiddenCheckbox
      checked={checked}
      onChange={(e) => {
        onChange(e)
      }}
      data-testid="hidden-checkbox"
    />
    <StyledCheckbox
      checked={checked}
      onClick={() =>
        onChange({
          target: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>)
      }
      data-testid="styled-checkbox"
    />
    <CheckboxLabel
      onClick={() =>
        onChange({
          target: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>)
      }
      data-testid="checkbox-label"
    >
      {label}
    </CheckboxLabel>
  </CheckboxContainer>
)

export default Checkbox
