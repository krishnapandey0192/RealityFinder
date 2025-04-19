"use client";

import { useEffect, useRef } from "react";
import { useProjects } from "@/lib/contexts/ProjectContext";
import { Loader2 } from "lucide-react";
import { Map } from "leaflet";

// Dynamic import for Leaflet components
import dynamic from "next/dynamic";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";
import { Project } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

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

const MapView: React.FC = () => {
  const { projects, selectedProject, setSelectedProject } = useProjects();
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && selectedProject) {
      mapRef.current.setView(
        [selectedProject.coordinates.lat, selectedProject.coordinates.lng],
        15
      );
    }
  }, [selectedProject]);

  return (
    <div className="h-full w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.coordinates.lat, project.coordinates.lng]}
            eventHandlers={{
              click: () => setSelectedProject(project),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{project.name}</h3>
                <p className="text-sm text-gray-600">{project.location}</p>
                <p className="text-sm font-medium text-blue-600">
                  {formatPrice(project.price)}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;