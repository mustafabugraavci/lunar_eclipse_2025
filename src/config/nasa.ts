export const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;

if (!NASA_API_KEY) {
  console.warn('NASA API key is not set. Please add it to your .env file.');
}

export const NASA_API_BASE_URL = 'https://api.nasa.gov/planetary/v2/eclipses';