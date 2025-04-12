import { Category } from "./Category"

export interface CreateBusinessPayload {
    email: string,
    name: string,
    aboutUs: string,
    image: string,
    categories: Category[]
}