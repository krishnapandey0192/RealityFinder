import CityPageClient from "@/components/CityPageClient";

export default function CityPage({ params }: { params: { cityName: string } }) {
  const { cityName } = params;
  return <CityPageClient cityName={cityName} />;
}

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  return [
    { cityName: 'mumbai' },
    { cityName: 'delhi' },
    { cityName: 'bangalore' },
    { cityName: 'hyderabad' },
    { cityName: 'chennai' },
    { cityName: 'pune' },
    { cityName: 'kolkata' },
    { cityName: 'ahmedabad' }
  ];
}