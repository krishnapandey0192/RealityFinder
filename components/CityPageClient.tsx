"use client";

import { useEffect, useState } from "react";
import { ProjectProvider, useProjects } from "@/lib/contexts/ProjectContext";
import ProjectList from "@/components/ProjectList";
import MapView from "@/components/MapView";
import CityHeader from "@/components/CityHeader";
import { Compass } from "lucide-react";
import Link from "next/link";
import LoadingState from "@/components/LoadingState";

function CityContent({ cityName }: { cityName: string }) {
  const { projects, selectedProject, setSelectedProject } = useProjects();

  return (
    <>
      <CityHeader cityName={cityName} />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
              <ProjectList
                projects={projects}
                onProjectClick={setSelectedProject}
              />
            </div>
          </div>
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24 h-[calc(100vh-200px)]">
              <MapView />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CityPageClient({ cityName }: { cityName: string }) {
  const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ProjectProvider cityName={formattedCityName}>
      <div className="min-h-screen flex flex-col bg-slate-50">
        <header className="bg-white shadow-sm py-3 sm:py-4 px-4 sm:px-6 sticky top-0 z-10">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <Link href="/" className="flex items-center gap-2">
                <Compass className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <span className="text-lg sm:text-xl font-bold">RealtyFinder</span>
              </Link>
              <div className="text-sm text-slate-500">
                Exploring projects in {formattedCityName}
              </div>
            </div>
          </div>
        </header>

        {isLoading ? (
          <LoadingState cityName={formattedCityName} />
        ) : (
          <CityContent cityName={formattedCityName} />
        )}
      </div>
    </ProjectProvider>
  );
}