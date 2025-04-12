export interface AuthenticatedUser {
    id: number,
    username: string, 
    firstName : string, 
    lastName: string, 
    email: string, 
    phoneNumber: string,
    isCompanyWoker: false,
    role: string,
    imageUrl: string | undefined
  }