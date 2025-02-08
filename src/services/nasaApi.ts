import { NASA_API_KEY, NASA_API_BASE_URL } from '../config/nasa';

export async function fetchNASAData(endpoint: string, params: Record<string, string> = {}) {
  const searchParams = new URLSearchParams({
    ...params,
    api_key: NASA_API_KEY
  });

  const response = await fetch(`${NASA_API_BASE_URL}${endpoint}?${searchParams}`);
  
  if (!response.ok) {
    throw new Error(`NASA API Error: ${response.statusText}`);
  }

  return response.json();
}