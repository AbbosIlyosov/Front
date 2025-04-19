import { BusinessSelectList } from "./Business";
import { Category } from "./Category";
import { Location } from "./Location";

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

export interface PointFilter{
  category: Category,
  location: Location,
  business: BusinessSelectList
}