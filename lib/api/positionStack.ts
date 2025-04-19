import { Coordinates, GeocodingResponse } from "@/lib/types";

// Mock PositionStack API response
const mockGeocodingResponse = (query: string): GeocodingResponse => {
  // Simulate city center coordinates for major Indian cities
  const cityCoordinates: Record<string, { lat: number; lng: number }> = {
    "Mumbai": { lat: 19.0760, lng: 72.8777 },
    "Delhi": { lat: 28.6139, lng: 77.2090 },
    "Bangalore": { lat: 12.9716, lng: 77.5946 },
    "Hyderabad": { lat: 17.3850, lng: 78.4867 },
    "Chennai": { lat: 13.0827, lng: 80.2707 },
    "Pune": { lat: 18.5204, lng: 73.8567 },
    "Kolkata": { lat: 22.5726, lng: 88.3639 },
    "Ahmedabad": { lat: 23.0225, lng: 72.5714 }
  };

  // Extract city name from query (assuming format like "Location, City")
  const parts = query.split(',');
  const cityPart = parts.length > 1 ? parts[1].trim() : parts[0].trim();
  
  // Find matching city or default to Mumbai
  let coords = { lat: 19.0760, lng: 72.8777 }; // Mumbai default
  
  for (const [city, coordinates] of Object.entries(cityCoordinates)) {
    if (cityPart.toLowerCase().includes(city.toLowerCase())) {
      coords = coordinates;
      break;
    }
  }

  // Add a small random offset to make each location slightly different
  const latOffset = (Math.random() - 0.5) * 0.05;
  const lngOffset = (Math.random() - 0.5) * 0.05;

  return {
    data: {
      results: [
        {
          latitude: coords.lat + latOffset,
          longitude: coords.lng + lngOffset
        }
      ]
    }
  };
};

// Function to geocode a location using PositionStack API (mocked)
export const geocodeLocation = async (location: string): Promise<Coordinates> => {
  try {
    // In a real application, you would make an API call to PositionStack
    // For this demo, we'll use a mock response
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock response
    const response = mockGeocodingResponse(location);
    
    // Parse response
    if (response.data.results.length > 0) {
      const result = response.data.results[0];
      return {
        lat: result.latitude,
        lng: result.longitude
      };
    }
    
    throw new Error("No results found");
  } catch (error) {
    console.error("Geocoding error:", error);
    // Return default coordinates (Mumbai) if geocoding fails
    return { lat: 19.0760, lng: 72.8777 };
  }
};