import { renderHook } from '@testing-library/react-hooks'
import { render, screen, fireEvent } from '@testing-library/react'
import { useDialogItemToRender } from './useDialogItemToRender'
import { useSubmissionTestContext } from '../../../contexts/SubmissionTestContext'
import { DialogStep } from '../interfaces'
import { defaultTheme } from '../../../styles/themes/default'
import { useDialogControlled } from '../../../components/DialogControlled'

jest.mock('../../../contexts/SubmissionTestContext')
jest.mock('../../../components/DialogControlled')

describe('useDialogItemToRender hook', () => {
  const mockHandleDeleteFileUpload = jest.fn()
  const mockHandleUpdateDialogControlled = jest.fn()
  const mockOptionToDelete = { name: 'Exame_12_03/2021' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      handleDeleteFileUpload: mockHandleDeleteFileUpload,
      optionToDelete: mockOptionToDelete,
    })
  })

  it('should return the correct dialog config for delete_mark', () => {
    const dialogSubmissionStep: DialogStep = 'delete_mark'

    const { result } = renderHook(() =>
      useDialogItemToRender({
        handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
        dialogSubmissionStep,
      }),
    )

    const expectedDialogConfig = {
      title: 'Apagar arquivo',
      description: 'Deseja excluir o arquivo Exame_12_03/2021?',
      width: '28rem',
      buttonConfig: [
        {
          id: 'back',
          label: 'Voltar',
          variant: 'secondary',
          action: expect.any(Function),
        },
        {
          id: 'delete',
          label: 'Excluir',
          variant: 'primary',
          action: expect.any(Function),
          backgroundColor: defaultTheme.colors.red500,
          color: defaultTheme.colors.neutral,
        },
      ],
    }

    expect(result.current.dialogItemToRender).toEqual(expectedDialogConfig)
  })

  it('should call handleUpdateDialogControlled(false) when back button action is triggered', () => {
    const dialogSubmissionStep: DialogStep = 'delete_mark'

    const { result } = renderHook(() =>
      useDialogItemToRender({
        handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
        dialogSubmissionStep,
      }),
    )

    const backButton = result.current.dialogItemToRender.buttonConfig?.find(
      (button) => button.id === 'back',
    )

    if (backButton?.action) {
      backButton.action()
      expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)
    }
  })

  it('should call handleDeleteFileUpload and handleUpdateDialogControlled(false) when delete button action is triggered', () => {
    const dialogSubmissionStep: DialogStep = 'delete_mark'

    const { result } = renderHook(() =>
      useDialogItemToRender({
        handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
        dialogSubmissionStep,
      }),
    )

    const deleteButton = result.current.dialogItemToRender.buttonConfig?.find(
      (button) => button.id === 'delete',
    )

    if (deleteButton?.action) {
      deleteButton.action()
      expect(mockHandleDeleteFileUpload).toHaveBeenCalled()
      expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)
    }
  })
})

// Componente de teste para renderizar o hook
const TestComponent = ({
  dialogSubmissionStep,
}: {
  dialogSubmissionStep: DialogStep
}) => {
  const { handleUpdateDialogControlled } = useDialogControlled()
  const { dialogItemToRender } = useDialogItemToRender({
    handleUpdateDialogControlled,
    dialogSubmissionStep,
  })

  if (!dialogItemToRender) return null

  return (
    <div>
      <h1>{dialogItemToRender.title}</h1>
      <p>{dialogItemToRender.description}</p>
      {!!dialogItemToRender.buttonConfig &&
        dialogItemToRender.buttonConfig?.map((button) => (
          <button
            key={button.id}
            onClick={button.action as any}
            style={{
              backgroundColor: button.backgroundColor,
              color: button.color,
            }}
          >
            {button.label}
          </button>
        ))}
    </div>
  )
}

describe('TestComponent', () => {
  const mockHandleUpdateDialogControlled = jest.fn()
  const mockHandleDeleteFileUpload = jest.fn()
  const mockOptionToDelete = { name: 'Exame_12_03/2021' }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      handleDeleteFileUpload: mockHandleDeleteFileUpload,
      optionToDelete: mockOptionToDelete,
    })
    ;(useDialogControlled as jest.Mock).mockReturnValue({
      handleUpdateDialogControlled: mockHandleUpdateDialogControlled,
      isDialogControlledOpen: true,
    })
  })

  it('should render the correct dialog and handle button actions', () => {
    render(<TestComponent dialogSubmissionStep="delete_mark" />)

    expect(screen.getByText('Apagar arquivo')).toBeInTheDocument()
    expect(
      screen.getByText((content) =>
        content.includes('Deseja excluir o arquivo Exame_12_03/2021?'),
      ),
    ).toBeInTheDocument()
    expect(screen.getByText('Voltar')).toBeInTheDocument()
    expect(screen.getByText('Excluir')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Voltar'))
    expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)

    fireEvent.click(screen.getByText('Excluir'))
    expect(mockHandleDeleteFileUpload).toHaveBeenCalled()
    expect(mockHandleUpdateDialogControlled).toHaveBeenCalledWith(false)
  })
})
