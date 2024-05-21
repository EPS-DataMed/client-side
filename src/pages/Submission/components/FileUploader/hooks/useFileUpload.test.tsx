import { renderHook, act } from '@testing-library/react-hooks'
import { useFileUpload } from './useFileUpload'
import { useSubmissionTestContext } from '../../../../../contexts/SubmissionTestContext'
import { ErrorToast } from '../../../../../components/Toast'
import { generateRandomId } from '../../../../../utils/mockFunctions'

jest.mock('../../../../../contexts/SubmissionTestContext')
jest.mock('../../../../../components/Toast')
jest.mock('../../../../../utils/mockFunctions')

describe('useFileUpload', () => {
  let setFilesUploaded: jest.Mock
  let filesUploaded: { name: string; url: string; id: string }[]

  beforeEach(() => {
    setFilesUploaded = jest.fn()
    filesUploaded = []
    ;(useSubmissionTestContext as jest.Mock).mockReturnValue({
      setFilesUploaded,
      filesUploaded,
    })
    ;(generateRandomId as jest.Mock).mockReturnValue('random-id')
  })

  it('should initialize correctly', () => {
    const { result } = renderHook(() => useFileUpload())
    expect(result.current.loadingFiles).toBe(false)
    expect(result.current.acceptedFiles).toEqual([])
    expect(result.current.variantFile).toBe('invalid')
  })

  it('should show error toast for duplicate file names', async () => {
    filesUploaded.push({
      name: 'duplicate.pdf',
      url: 'www.example.com',
      id: 'random-id',
    })
    const file = new File(['dummy content'], 'duplicate.pdf', {
      type: 'application/pdf',
    })

    const { result } = renderHook(() => useFileUpload())

    act(() => {
      result.current.onDrop([file])
    })

    expect(ErrorToast).toHaveBeenCalledWith(
      'Nome duplicado, não é possível subir arquivos com o mesmo nome',
    )
    expect(result.current.loadingFiles).toBe(false)
  })
})
