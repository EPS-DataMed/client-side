import { Select } from '..'

interface ItempOtion {
  value: string
  label: string
}

interface SelectConfigProps {
  items: ItempOtion[]
  handleValueChange: (newValue: string) => void
  defaultValue?: string
  hasError?: boolean
  dataTestId?: string
}

export function SelectConfig({
  items,
  handleValueChange,
  defaultValue,
  hasError = false,
  dataTestId,
}: SelectConfigProps) {
  return (
    <Select.Root
      defaultValue={defaultValue || undefined}
      onValueChange={handleValueChange}
    >
      <Select.Trigger
        data-testid={dataTestId}
        className="SelectTrigger"
        hasError={hasError}
      >
        <Select.Value placeholder="Selecione..." />
        <Select.Icon style={{ marginTop: '4px' }} className="SelectIcon">
          <Select.ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content
          className="SelectContent"
          position="popper"
          align="end"
          sideOffset={2}
        >
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              {items.map((option) => (
                <Select.Item key={option.value} value={option.value}>
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
