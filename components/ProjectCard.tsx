import { Project } from "@/lib/types";
import { Building, MapPin, Home, CheckCircle2, Calendar, Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  isSelected?: boolean;
}

const ProjectCard = ({ project, isSelected, onClick }: ProjectCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Reliable real estate images from Pexels
  const defaultImages = [
    "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg",
    "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
    "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg",
    "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg",
    "https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg",
    "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
    "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg",
    "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg"
  ];

  // Get a consistent image based on project ID
  const getProjectImage = () => {
    const idNumber = parseInt(project.id.split('-')[1] || '0');
    return defaultImages[idNumber % defaultImages.length];
  };

  // Fallback image in case of error
  const fallbackImage = "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg";

  return (
    <div
      className={cn(
        "cursor-pointer border rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md",
        isSelected ? "ring-2 ring-blue-500 shadow-md" : "hover:border-blue-200"
      )}
      onClick={onClick}
    >
      <div className="relative h-48 w-full bg-slate-100">
        <Image
          src={imageError ? fallbackImage : getProjectImage()}
          alt={project.name}
          fill
          className="object-cover"
          priority
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-slate-900">{project.name}</h3>
            <div className="flex items-center text-sm text-slate-500 mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {project.reraApproved && (
              <div className="flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="h-3.5 w-3.5" />
                RERA Approved
              </div>
            )}
            <div className="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              New
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Price</div>
            <div className="font-semibold text-slate-900">{formatPrice(project.price)}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Builder</div>
            <div className="font-medium text-slate-900 flex items-center">
              <Building className="h-3 w-3 mr-1" />
              {project.builder}
            </div>
          </div>
        </div>

        {project.completionDate && (
          <div className="mt-3 flex items-center gap-1 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>Completion: {new Date(project.completionDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        )}

        {project.amenities && project.amenities.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Star className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Amenities</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.amenities.slice(0, 3).map((amenity, index) => (
                <div key={index} className="bg-slate-50 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {amenity}
                </div>
              ))}
              {project.amenities.length > 3 && (
                <div className="bg-slate-50 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  +{project.amenities.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {project.units && project.units.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5 mb-2">
              <Home className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Available Units</span>
            </div>
            <div className="grid gap-2">
              {project.units.map((unit, index) => (
                <div key={index} className="bg-slate-50 p-2 rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-slate-900">{unit.type}</span>
                      <span className="text-xs text-slate-500 ml-2">{unit.size}</span>
                    </div>
                    <div className="font-semibold text-slate-900">
                      {formatPrice(unit.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;