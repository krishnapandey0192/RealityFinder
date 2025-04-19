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
  reraApproved?: boolean;
  builder?: string;
  units?: {
    type: string;
    size: string;
    price: number;
  }[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface GeocodingResponse {
  data: {
    results: Array<{
      latitude: number;
      longitude: number;
    }>;
  };
}