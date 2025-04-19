export interface Appointment {
    id: number,
    pointId: number,
    appointmentTime: string
}

export interface FetchAppointmentParams {
    pointId: number,
    date: Date
}

export interface CreateAppointmentPayload {
    pointId: number,
    appointmentTime: Date
}


export interface UpdateAppointmentPayload {
    id: number,
    appointmentTime?: Date,
    statusId?: number,
    pointId?: number
}

export interface MyAppointment {
    id: number,
    pointId: number,
    appointmentTime: string,
    appointmentTimeString: string,
    serviceType: string, 
    address: string,
    point: string,
    userId: number,
    firstName: string,
    lastName: string,
    avatar: string
    orderNumber: number,
    status: string,
    hasReview: boolean
}