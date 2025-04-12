export interface Business {
    id: number,
    name: string,
    aboutUs: string,
    statusId: number,
    status: string,
    pointsCount: number,
    image: string | undefined
}

export interface BusinessSelectList {
    id: number, 
    name: string
}

export interface BusinessGridInfo extends BusinessSelectList {
    logo: string
}