export type AuthenticatedUser  = {
    id: number,
    username: string, 
    firstName : string, 
    lastName: string, 
    email: string, 
    phoneNumber: string,
    isCompanyWoker: false,
    role: string,
    imageUrl: string | null
  }