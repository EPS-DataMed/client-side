import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from '.'
import AppProviders from '../AppProviders'

describe('Input Component', () => {
  test('renders Input component with default props', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input id="test-input" placeholder="Test Placeholder" />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveStyle('width: 100%')
  })

  test('renders Input component with error state', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input
            id="test-input"
            placeholder="Test Placeholder"
            hasError
          />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveStyle('border: 1px solid #FF0000')
  })

  test('renders Input component with disabled state', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input
            id="test-input"
            placeholder="Test Placeholder"
            disabled
          />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveStyle('cursor: not-allowed')
    expect(inputElement).toHaveStyle('background-color: #F9F9F9')
  })

  test('renders Input component with searchbar variant', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input
            id="test-input"
            placeholder="Test Placeholder"
            variant="searchbar"
          />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveStyle('height: 32px')
    expect(inputElement).toHaveStyle('padding-left: 38px')
    expect(inputElement).toHaveStyle('padding-right: 38px')
  })

  test('renders Input component with custom width', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input
            id="test-input"
            placeholder="Test Placeholder"
            width="250px"
          />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveStyle('width: 100%')
  })

  test('renders Label component with correct styles', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
        </Input.Root>
      </AppProviders>,
    )

    const labelElement = screen.getByText('Test Label')
    expect(labelElement).toBeInTheDocument()
    expect(labelElement).toHaveStyle('color: #181818')
  })

  test('renders Description component with correct styles', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Description>Description Text</Input.Description>
        </Input.Root>
      </AppProviders>,
    )

    const descriptionElement = screen.getByText('Description Text')
    expect(descriptionElement).toBeInTheDocument()
    expect(descriptionElement).toHaveStyle('color: #42424A')
  })

  test('renders RequiredText component with error variant', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.RequiredText variant="error">Required</Input.RequiredText>
        </Input.Root>
      </AppProviders>,
    )

    const requiredTextElement = screen.getByText('Required')
    expect(requiredTextElement).toBeInTheDocument()
    expect(requiredTextElement).toHaveStyle('color: #FF0000')
  })

  test('renders ErrorMessage component with correct styles', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.ErrorMessage>Error Message</Input.ErrorMessage>
        </Input.Root>
      </AppProviders>,
    )

    const errorMessageElement = screen.getByText('Error Message')
    expect(errorMessageElement).toBeInTheDocument()
    expect(errorMessageElement).toHaveStyle('color: #FF0000')
  })

  test('renders Input component with cursor not-allowed', () => {
    render(
      <AppProviders>
        <Input.Root>
          <Input.Label htmlFor="test-input">Test Label</Input.Label>
          <Input.Input
            id="test-input"
            placeholder="Test Placeholder"
            cursor="not-allowed"
          />
        </Input.Root>
      </AppProviders>,
    )

    const inputElement = screen.getByPlaceholderText('Test Placeholder')
    expect(inputElement).toHaveStyle('cursor: not-allowed')

    fireEvent.mouseOver(inputElement)
    expect(inputElement).toHaveStyle('border-color: #A5A5A5')
  })
})
