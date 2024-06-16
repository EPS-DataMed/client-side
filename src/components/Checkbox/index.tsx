import React from 'react'
import styled from 'styled-components'

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.space[2]};
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
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
  font-size: ${(props) => props.theme.fontSizes.md};
  color: ${(props) => props.theme.colors.neutral700};
`

interface CheckboxProps {
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <CheckboxContainer>
    <HiddenCheckbox
      checked={checked}
      onChange={(e) => {
        onChange(e)
      }}
    />
    <StyledCheckbox
      checked={checked}
      onClick={() =>
        onChange({
          target: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>)
      }
    />
    <CheckboxLabel
      onClick={() =>
        onChange({
          target: { checked: !checked },
        } as React.ChangeEvent<HTMLInputElement>)
      }
    >
      {label}
    </CheckboxLabel>
  </CheckboxContainer>
)

export default Checkbox
