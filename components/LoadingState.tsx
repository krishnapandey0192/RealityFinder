"use client";

import { useProjects } from "@/lib/contexts/ProjectContext";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  cityName: string;
}

const LoadingState = ({ cityName }: LoadingStateProps) => {
  const { loadingProgress, loadingStatus } = useProjects();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Projects</h2>
        <p className="text-slate-600 mb-6">
          We're fetching the latest real estate projects in {cityName}
        </p>

        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>

        <div className="flex justify-between text-sm text-slate-500">
          <span>{loadingProgress}% complete</span>
          <span>{loadingStatus}</span>
        </div>

        <div className="mt-8 text-sm text-slate-500">
          <p>This may take a few moments as we gather real-time data</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;