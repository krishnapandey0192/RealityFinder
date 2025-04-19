import { NextResponse } from 'next/server';
import { getMockProjects } from '@/lib/api/mockData';
import { Project } from '@/lib/types';

// Configure the route as dynamic
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request: Request) {
  try {
    // Log the incoming request
    console.log('Received request for projects');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));

    const { searchParams } = new URL(request.url);
    const cityName = searchParams.get('city');
    const sortBy = searchParams.get('sortBy') || 'none';

    if (!cityName) {
      console.log('No city name provided');
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'City name is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

    // Format city name to match the mock data format
    const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
    console.log(`Fetching projects for city: ${formattedCityName}`);

    try {
      // Validate city name
      const validCities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Pune", "Kolkata", "Ahmedabad"];
      if (!validCities.includes(formattedCityName)) {
        console.log(`Invalid city name: ${formattedCityName}`);
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: `Invalid city name: ${formattedCityName}`
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Get mock projects for the city
      console.log('Generating mock projects...');
      let projects = getMockProjects(formattedCityName);

      if (!Array.isArray(projects)) {
        console.error('Invalid projects data:', projects);
        throw new Error('Invalid projects data format');
      }

      // Apply sorting if requested
      if (sortBy === 'price_low_to_high') {
        projects = projects.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_high_to_low') {
        projects = projects.sort((a, b) => b.price - a.price);
      }

      console.log(`Generated ${projects.length} projects for ${formattedCityName}`);

      if (projects.length === 0) {
        console.log(`No projects generated for ${formattedCityName}`);
        return new NextResponse(
          JSON.stringify({
            success: false,
            error: `No projects found for ${formattedCityName}`
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          }
        );
      }

      // Validate project data
      const validProjects = projects.filter(project =>
        project &&
        project.id &&
        project.name &&
        project.location &&
        project.coordinates &&
        typeof project.price === 'number'
      );

      if (validProjects.length === 0) {
        console.error('No valid projects generated');
        throw new Error('Failed to generate valid projects');
      }

      // Return successful response with projects
      return new NextResponse(
        JSON.stringify({
          success: true,
          data: {
            city: formattedCityName,
            projects: validProjects,
            total: validProjects.length
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );

    } catch (mockDataError) {
      console.error('Error in getMockProjects:', mockDataError);
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: 'Error generating mock data',
          details: mockDataError instanceof Error ? mockDataError.message : 'Unknown error'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }

  } catch (error) {
    console.error('Error in scrape API:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: 'Internal server error occurred',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
}