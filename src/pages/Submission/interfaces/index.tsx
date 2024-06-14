export type DialogStep = '' | 'delete_mark' | 'logout'
export interface Exam {
  user_id: number
  id: number
  url: string
  test_name: string
  submission_date: string
}

export interface RequestUploadProps {
  userId: number
  files: File[]
  token: string
}

export interface RequestDeleteFile {
  userId: number
  fileId: number
  token: string
}

export interface RequestExams {
  userId: number
  token: string
}
export interface DeleteResponse {
  success: boolean
  message: string
  data: Exam[]
}
