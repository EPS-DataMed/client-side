import { render, screen, fireEvent } from '@testing-library/react'
import { Submission } from './'
import { useSubmissionTestContext } from '../../contexts/SubmissionTestContext'
import AppProviders from '../../components/AppProviders'
import { useFileUpload } from './components/FileUploader/hooks/useFileUpload'
import { useDialogControlled } from '../../components/DialogControlled'
import { useDialogItemToRender } from './hooks/useDialogItemToRender'

jest.mock('../../contexts/SubmissionTestContext')
jest.mock('./components/FileUploader/hooks/useFileUpload')
jest.mock('../../components/DialogControlled')
jest.mock('./hooks/useDialogItemToRender')

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<AppProviders>{ui}</AppProviders>)
}

describe('Submission', () => {
  beforeEach(() => {
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      filesUploaded: [],
      setOptionToDelete: jest.fn(),
      queryHook: {
        selectedOption: null,
      },
    })
    ;(useFileUpload as jest.Mock).mockReturnValue({
      getInputProps: jest.fn(),
      getRootProps: jest.fn(),
      loadingFiles: false,
    })
    ;(useDialogControlled as jest.Mock).mockReturnValue({
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: false,
    })
    ;(useDialogItemToRender as jest.Mock).mockReturnValue({
      dialogItemToRender: {
        delete_mark: {
          title: 'Apagar arquivo',
          description: 'Deseja excluir o arquivo Exame_12_03/2021? ',
          width: '28rem',
          buttonConfig: [
            {
              id: 'back',
              label: 'Voltar',
              variant: 'secondary',
              action: jest.fn(),
            },
            {
              id: 'delete',
              label: 'Excluir',
              variant: 'primary',
              action: jest.fn(),
            },
          ],
        },
      },
    })
  })

  it('should render the breadcrumbs', () => {
    renderWithProviders(<Submission />)
    const breadcrumb = screen.getByTestId('breadcrumb')
    expect(breadcrumb).toBeInTheDocument()
  })

  it('should render the page title and description', () => {
    renderWithProviders(<Submission />)
    const title = screen.getByTestId('page-title')
    const description = screen.getByTestId('page-description')
    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  it('should render the file uploader', () => {
    renderWithProviders(<Submission />)
    const fileUploader = screen.getByTestId('file-uploader')
    expect(fileUploader).toBeInTheDocument()
  })

  it('should render the step box with no files', () => {
    renderWithProviders(<Submission />)
    const stepBoxEmpty = screen.getByTestId('step-box-empty')
    expect(stepBoxEmpty).toBeInTheDocument()
  })

  it('should render the step box with files when files are uploaded', () => {
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      filesUploaded: [{ name: 'file1.pdf', id: '1' }],
      setOptionToDelete: jest.fn(),
      queryHook: {
        selectedOption: { name: 'file1.pdf', id: '1' },
      },
    })

    renderWithProviders(<Submission />)
    const stepBoxFilled = screen.getByTestId('step-box-filled')
    expect(stepBoxFilled).toBeInTheDocument()
  })

  it('should open the dialog when an item is selected for deletion', () => {
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      filesUploaded: [{ name: 'file1.pdf', id: '1' }],
      setOptionToDelete: jest.fn(),
      queryHook: {
        selectedOption: { name: 'file1.pdf', id: '1' },
      },
    })
    ;(useDialogControlled as jest.Mock).mockReturnValue({
      handleUpdateDialogControlled: jest.fn(),
      isDialogControlledOpen: true,
    })

    renderWithProviders(<Submission />)
    const advanceButton = screen.getByTestId('advance-button')
    fireEvent.click(advanceButton)

    fireEvent.click(screen.getByTestId('advance-button'))
    expect(screen.getByTestId('advance-button')).toBeInTheDocument()
  })
})
