"use client";

import { useEffect, useRef } from "react";
import { useProjects } from "@/lib/contexts/ProjectContext";
import { Loader2 } from "lucide-react";

// Dynamic import for Leaflet components
import dynamic from "next/dynamic";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
import { Project } from "@/lib/types";

// Dynamically import Map components with no SSR
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const MapView = () => {
  const { projects, isLoading, selectedProject, setSelectedProject } = useProjects();
  const mapRef = useRef<L.Map | null>(null);
  
  // Calculate center coordinates based on projects
  const getCenterCoordinates = () => {
    if (selectedProject) {
      return [selectedProject.coordinates.lat, selectedProject.coordinates.lng];
    }
    
    if (projects.length > 0) {
      const latSum = projects.reduce((sum, p) => sum + p.coordinates.lat, 0);
      const lngSum = projects.reduce((sum, p) => sum + p.coordinates.lng, 0);
      return [latSum / projects.length, lngSum / projects.length];
    }
    
    // Default to center of India if no projects
    return [20.5937, 78.9629];
  };

  // Fix Leaflet icon issue
  useEffect(() => {
    // This code fixes the missing marker icon issue in Leaflet
    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  // Center map on selected project
  useEffect(() => {
    if (mapRef.current && selectedProject) {
      mapRef.current.setView(
        [selectedProject.coordinates.lat, selectedProject.coordinates.lng],
        14
      );
    }
  }, [selectedProject]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border flex items-center justify-center h-full">
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading map data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full overflow-hidden">
      <MapContainer
        center={getCenterCoordinates() as [number, number]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => (mapRef.current = map)}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {projects.map((project: Project) => (
          <Marker
            key={project.id}
            position={[project.coordinates.lat, project.coordinates.lng]}
            eventHandlers={{
              click: () => {
                setSelectedProject(project);
              },
            }}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-sm">{project.name}</h3>
                <p className="text-xs text-slate-500">{project.location}</p>
                <p className="text-xs font-medium mt-1">{project.priceRange}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;