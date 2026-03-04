import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export interface Build {
  url: string;
  version: string;
  platform: string;
}

async function fetchBuilds(): Promise<Build[]> {
  const response = await fetch(`${API_URL}/api/builds`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useBuilds() {
  return useQuery({
    queryKey: ['builds'],
    queryFn: fetchBuilds,
  });
}
