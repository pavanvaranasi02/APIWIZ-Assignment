export interface Mood {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: "IT";
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: Mood;
  weather: Weather;
  note: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
  weather: Weather;
  note: string;
}

export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: "date" | "temperature";
  order: SortOrder;
}

export interface FilterConfig {
  dateRange?: {
    start: string;
    end: string;
  };
  temperature?: {
    min: number;
    max: number;
  };
  mood?: string;
}
