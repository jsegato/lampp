import { Address } from "./address";

export interface Customer {
    id: number;
    name: string;
    email: string;
    gender: string;
    phone: string;
    document: string;
    dateBirth: string;
    active: boolean;
    address: Address[];
}
