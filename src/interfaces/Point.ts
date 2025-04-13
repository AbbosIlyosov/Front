export interface PointsGridInfo {
    id:number,
    pointName:string,
    workingTimeStart: string,
    workingTimeEnd: string,
    image: string,
    rating:number,
  }

export interface PointsFilterParams{
  categoryId: number,
  locationId: number,
  businessId: number
}