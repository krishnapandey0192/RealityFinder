"use client";

import React, { useEffect, useState } from "react";
import { useProjects } from "@/lib/contexts/ProjectContext";
import ProjectCard from "./ProjectCard";
import { Project } from "@/lib/types";

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  const { currentSort, setCurrentSort } = useProjects();
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (projects.length > 0) {
      const sorted = [...projects].sort((a, b) => {
        return currentSort === 'price_low_to_high' ? a.price - b.price : b.price - a.price;
      });
      setSortedProjects(sorted);
    } else {
      setSortedProjects([]);
    }
  }, [projects, currentSort]);

  const handleSortChange = (sortBy: string) => {
    setCurrentSort(sortBy);
  };

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-4 h-[calc(100vh-180px)] overflow-y-auto">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-slate-600">No projects found for this location</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Available Projects ({projects.length})</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSortChange('price_low_to_high')}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${currentSort === 'price_low_to_high'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => handleSortChange('price_high_to_low')}
            className={`px-3 sm:px-4 py-2 rounded text-sm sm:text-base ${currentSort === 'price_high_to_low'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;