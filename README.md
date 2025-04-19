# RealtyFinder - Real Estate Project Finder

A modern web application built with Next.js that helps users find real estate projects in different cities. The application features a map view, project listings, and detailed project information.

## Features

- 🏙️ City-wise project listings
- 🗺️ Interactive map view
- 💰 Price-based sorting
- 📱 Fully responsive design
- 🏗️ Detailed project information
- 🏠 Unit-wise pricing
- 📅 Project completion dates
- 🏊 Amenities information

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Maps**: React Leaflet
- **State Management**: React Context API

## Project Structure

```
project/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── [city]/            # Dynamic city pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── ProjectCard.tsx   # Project card component
│   ├── ProjectList.tsx   # Project list component
│   ├── MapView.tsx       # Map view component
│   └── ...
├── lib/                  # Utility functions and types
│   ├── contexts/        # React contexts
│   ├── types.ts         # TypeScript types
│   └── utils.ts         # Utility functions
└── public/              # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build cache

### Key Components

1. **ProjectCard**
   - Displays individual project information
   - Shows project image, price, location, and amenities
   - Responsive design for all screen sizes

2. **ProjectList**
   - Lists all projects in a grid layout
   - Implements price-based sorting
   - Handles empty states and loading states

3. **MapView**
   - Interactive map showing project locations
   - Markers for each project
   - Click interactions to view project details

4. **ProjectContext**
   - Manages global project state
   - Handles data fetching and caching
   - Provides sorting and filtering functionality

## API Routes

The application uses the following API routes:

- `/api/scrape` - Fetches project data for a specific city
- Parameters:
  - `city`: City name
  - `sortBy`: Sorting criteria (price_low_to_high, price_high_to_low)

## Environment Variables

- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` - Mapbox API token for maps
- `NEXT_PUBLIC_API_URL` - API base URL (optional)

## Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

For deployment to Vercel:
1. Push your code to a Git repository
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- shadcn/ui for the beautiful UI components
- React Leaflet for the map integration 