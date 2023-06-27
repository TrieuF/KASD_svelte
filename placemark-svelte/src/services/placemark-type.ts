export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
}

export interface LoggedInUser {
    email: string;
    token: string;
    id: string;
}

export interface chart{
    selected: string;
}

export interface Placemark{
    name: string;
    description: string;
    location: {
        lat: number;
        lng: number;
    };
    category: string;
}

export interface Placemarkreturned extends Placemark{
    _id: string,
    img: Array<string>,
    createdBy: string,
}

export interface mapconf {
    location: { lat: number, lng: number };
    zoom: number;
    minZoom: number;
};