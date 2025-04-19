import { Project } from "@/lib/types";

// Function to generate random coordinates around a city's center
const getRandomCoordinates = (baseLat: number, baseLng: number) => {
  // Generate a random offset within a reasonable range (approximately 5-10km)
  const latOffset = (Math.random() - 0.5) * 0.1;
  const lngOffset = (Math.random() - 0.5) * 0.1;

  return {
    lat: baseLat + latOffset,
    lng: baseLng + lngOffset
  };
};

// Function to generate a random price
const getRandomPrice = () => {
  const basePrice = Math.floor(Math.random() * 10000000) + 5000000; // Random price between 50L and 1.5Cr
  return basePrice;
};

// Function to generate a random property type
const getRandomPropertyType = () => {
  const types = ["Apartment", "Villa", "Penthouse", "Row House", "Studio"];
  return types[Math.floor(Math.random() * types.length)];
};

// Function to generate a random status
const getRandomStatus = (): "Ready to Move" | "Under Construction" | "New Launch" => {
  const statuses = ["Ready to Move", "Under Construction", "New Launch"];
  return statuses[Math.floor(Math.random() * statuses.length)] as any;
};

// Function to generate random amenities
const getRandomAmenities = () => {
  const allAmenities = [
    "Swimming Pool",
    "Gym",
    "Club House",
    "Children's Play Area",
    "24x7 Security",
    "Power Backup",
    "Garden",
    "Indoor Games",
    "Jogging Track",
    "Tennis Court",
    "Basketball Court",
    "Spa",
    "Shopping Center"
  ];

  // Select 3-7 random amenities
  const count = Math.floor(Math.random() * 5) + 3;
  const amenities = [];

  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * allAmenities.length);
    if (!amenities.includes(allAmenities[index])) {
      amenities.push(allAmenities[index]);
    }
  }

  return amenities;
};

// City coordinates (approximate centers)
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

// List of builders
const builders = [
  "Godrej Properties",
  "Prestige Group",
  "DLF Limited",
  "Lodha Group",
  "Sobha Limited",
  "Brigade Group",
  "Tata Housing",
  "Shapoorji Pallonji",
  "Puravankara Limited",
  "Embassy Group"
];

// List of location names for each city
const cityLocations: Record<string, string[]> = {
  "Mumbai": ["Andheri", "Bandra", "Worli", "Powai", "Malad", "Goregaon", "Juhu", "Chembur", "Mulund", "Borivali"],
  "Delhi": ["Dwarka", "Rohini", "Pitampura", "Janakpuri", "Vasant Kunj", "Greater Kailash", "Mayur Vihar", "Saket", "Karol Bagh", "Connaught Place"],
  "Bangalore": ["Whitefield", "Electronic City", "HSR Layout", "Koramangala", "Indiranagar", "JP Nagar", "Marathahalli", "Sarjapur Road", "Hebbal", "Bannerghatta Road"],
  "Hyderabad": ["Gachibowli", "Madhapur", "Kondapur", "Banjara Hills", "Jubilee Hills", "Kukatpally", "Miyapur", "Manikonda", "Hitech City", "Secunderabad"],
  "Chennai": ["Adyar", "T Nagar", "Velachery", "Anna Nagar", "Porur", "Pallavaram", "Sholinganallur", "OMR", "Nungambakkam", "Mylapore"],
  "Pune": ["Hinjewadi", "Wakad", "Baner", "Kharadi", "Viman Nagar", "Hadapsar", "Kothrud", "Aundh", "Magarpatta", "Kalyani Nagar"],
  "Kolkata": ["Salt Lake", "New Town", "Ballygunge", "Alipore", "Garia", "Tollygunge", "Rajarhat", "Park Street", "Behala", "Howrah"],
  "Ahmedabad": ["Satellite", "Bodakdev", "Vastrapur", "Thaltej", "Prahlad Nagar", "SG Highway", "CG Road", "Navrangpura", "Bopal", "Maninagar"]
};

// Function to generate a random project name
const getRandomProjectName = (builder: string, location: string) => {
  const prefixes = ["The", "Royal", "Green", "Elite", "Premium", "Luxury", "Urban", "Metro", "Grand", "Prime"];
  const suffixes = ["Heights", "Towers", "Gardens", "Residency", "Court", "Avenue", "Oasis", "Paradise", "Enclave", "Square"];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

  // 50% chance to use builder name in project name
  if (Math.random() > 0.5) {
    return `${builder} ${suffix}`;
  } else {
    return `${prefix} ${suffix}`;
  }
};

const generateMockProject = (city: string, index: number): Project => {
  const basePrice = getRandomPrice();
  const location = cityLocations[city][Math.floor(Math.random() * cityLocations[city].length)];
  const builder = builders[Math.floor(Math.random() * builders.length)];

  return {
    id: `${city.toLowerCase()}-${index + 1}`,
    name: getRandomProjectName(builder, location),
    location: `${location}, ${city}`,
    coordinates: getRandomCoordinates(cityCoordinates[city].lat, cityCoordinates[city].lng),
    price: basePrice,
    description: `A premium residential project in ${location}, ${city} offering modern amenities and luxurious living spaces.`,
    imageUrl: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000)}/pexels-photo-${Math.floor(Math.random() * 1000)}.jpeg`,
    amenities: getRandomAmenities(),
    developer: builder,
    completionDate: '2024-12-31',
    units: [
      {
        type: '2BHK',
        size: '1000 sq.ft',
        price: basePrice * 0.8,
      },
      {
        type: '3BHK',
        size: '1500 sq.ft',
        price: basePrice,
      },
      {
        type: '4BHK',
        size: '2000 sq.ft',
        price: basePrice * 1.2,
      },
    ],
  };
};

export const getMockProjects = (city: string): Project[] => {
  const numProjects = Math.floor(Math.random() * 10) + 5; // Random number of projects between 5 and 15
  return Array.from({ length: numProjects }, (_, index) => generateMockProject(city, index));
};