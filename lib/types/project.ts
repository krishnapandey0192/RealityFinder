export interface Project {
    id: string;
    name: string;
    location: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    price: number;
    description?: string;
    imageUrl?: string;
    amenities?: string[];
    developer?: string;
    completionDate?: string;
    units?: {
        type: string;
        size: string;
        price: number;
    }[];
} 