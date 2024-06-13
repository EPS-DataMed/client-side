export type DialogStep = '' | 'delete_mark' | 'logout'
export interface Exam {
  user_id: number
  id: number
  url: string
  test_name: string
  submission_date: string
}

export interface DeleteResponse {
  success: boolean
  message: string
}
