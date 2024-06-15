export interface GetUserResponse {
  
  content:{
    nome_completo: string,
    email: string,
    data_nascimento: string,
    sexo_biologico: string,
  }
  
    
}

export interface EditPasswordPayload {
  senha: string
}
  
export interface DeleteResponse{
  response: string
}