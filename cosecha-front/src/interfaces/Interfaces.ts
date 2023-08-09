export interface Client {
    id: number;
    phone: string;
    name: string;
    info: string;
    location_id: number;
    location_name?: string;
    email: string;
    business_name: string;
    service_id: number;
    service_name?:string
    area_id?:string
    area_name?:string
}

export interface Location {
    id: string,
    name: string
}

export interface Service{
    id: string,
    name: string
}

export interface Area{
    id: string,
    name: string,
    status:boolean | number
}