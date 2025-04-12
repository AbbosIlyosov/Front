export interface CreatePointPayload {
    pointName: string,
    workingTimeId:number,
    locationId: number,
    businessId: number,
    categories: number[]
    image: string,
    userId: number
}