export interface AddReviewPayload {
    comment: string,
    rating: number,
    pointId: number,
    appointmentId: number
}

export interface Review {
    id: number,
    rating: number, 
    comment: string,
    user: string,
    point: string,
    userId: number, 
    pointId: number,
    appointmentId: number
}