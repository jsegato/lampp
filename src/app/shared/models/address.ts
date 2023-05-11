export interface Address {
    id: number;
    zipcode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    referencePoint?: string;
}
