import Cookies from "js-cookie";

const WEATHER_CACHE_KEY = "weatherData";
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes in milliseconds

interface CachedWeather {
  data: any;
  timestamp: number;
}

export const weatherCookieUtils = {
  setWeatherData: (data: any) => {
    const cacheData: CachedWeather = {
      data,
      timestamp: Date.now(),
    };
    Cookies.set(WEATHER_CACHE_KEY, JSON.stringify(cacheData), {
      expires: 1 / 48, 
    });
  },

  getWeatherData: (): any | null => {
    const cachedData = Cookies.get(WEATHER_CACHE_KEY);
    if (!cachedData) return null;

    const parsed: CachedWeather = JSON.parse(cachedData);
    const now = Date.now();

    if (now - parsed.timestamp > CACHE_DURATION) {
      Cookies.remove(WEATHER_CACHE_KEY);
      return null;
    }

    return parsed.data;
  },

  clearWeatherData: () => {
    Cookies.remove(WEATHER_CACHE_KEY);
  },
};
