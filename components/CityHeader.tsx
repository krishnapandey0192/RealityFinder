"use client";

import { useProjects } from "@/lib/contexts/ProjectContext";
import { Building, Filter, Map } from "lucide-react";

interface CityHeaderProps {
  cityName: string;
}

const CityHeader = ({ cityName }: CityHeaderProps) => {
  const { projects, isLoading, loadingProgress } = useProjects();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Building className="h-6 w-6" />
              {cityName} Real Estate Projects
            </h1>
            <p className="text-slate-500 mt-1">
              {isLoading
                ? `Loading projects... (${loadingProgress}%)`
                : `${projects.length} projects found`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-md shadow-sm">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-l-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-r-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 border-l-0">
                <Map className="h-4 w-4" />
                Map View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityHeader;