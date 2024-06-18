export interface GetUserResponse {
  
  content:{
    full_name: string,
    email: string,
    birth_date: string,
    biological_sex: string,
  }
  
    
}

export interface EditPasswordPayload {
  
  password: string
}
  
export interface DeleteResponse{
  response: string
}