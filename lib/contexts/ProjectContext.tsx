"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project } from "@/lib/types";

interface ProjectContextType {
  projects: Project[];
  isLoading: boolean;
  loadingProgress: number;
  loadingStatus: string;
  error: string | null;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  cityName: string;
  fetchProjects: (city: string, sortBy?: string) => Promise<void>;
  currentCity: string;
  currentSort: string;
  setCurrentSort: (sort: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
  cityName: string;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children, cityName }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState("Initializing...");
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCity, setCurrentCity] = useState<string>(cityName);
  const [currentSort, setCurrentSort] = useState<string>('none');

  const fetchProjects = async (city: string, sortBy: string = 'none') => {
    setIsLoading(true);
    setError(null);
    setCurrentSort(sortBy);
    console.log(`Fetching projects for city: ${city} with sort: ${sortBy}`);

    try {
      const response = await fetch(`/api/scrape?city=${encodeURIComponent(city)}&sortBy=${sortBy}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch projects');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch projects');
      }

      // Only set projects if we have valid data
      if (data.data?.projects && Array.isArray(data.data.projects)) {
        setProjects(data.data.projects);
        setCurrentCity(city);
        console.log(`Successfully fetched ${data.data.projects.length} projects`);
      } else {
        throw new Error('Invalid projects data received');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while fetching projects');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(cityName);
  }, [cityName]);

  return (
    <ProjectContext.Provider value={{
      projects,
      isLoading,
      loadingProgress,
      loadingStatus,
      error,
      selectedProject,
      setSelectedProject,
      cityName,
      fetchProjects,
      currentCity,
      currentSort,
      setCurrentSort,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};