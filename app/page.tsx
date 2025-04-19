import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Popular cities for real estate in India
  const popularCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
   

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <header className="container mx-auto py-6 px-4 md:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">RealtyFinder</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Discover Your Perfect Property
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-8">
            Explore the latest real estate projects across major Indian cities
          </p>

          <div className="relative w-full max-w-xl mx-auto">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Popular Cities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {popularCities.map((city) => (
                <Link href={`/city/${city.toLowerCase()}`} key={city}>
                  <Button
                    variant="outline"
                    className="w-full py-6 text-base hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300"
                  >
                    {city}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-3">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-lg font-medium mb-2">Select a City</h3>
              <p className="text-slate-600">Choose from our list of major Indian cities to explore projects</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-lg font-medium mb-2">Browse Properties</h3>
              <p className="text-slate-600">View the latest projects with detailed information</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-lg font-medium mb-2">Explore Locations</h3>
              <p className="text-slate-600">Use our interactive map to see where each project is located</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-800 text-white py-8 mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Compass className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-semibold">RealtyFinder</span>
            </div>
            <div className="text-slate-300 text-sm">
              © {new Date().getFullYear()} RealtyFinder. This is a demo project.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}