import { Mood } from "../types";

export const MOOD_OPTIONS: Mood[] = [
  {
    id: "happy",
    name: "Happy",
    icon: "😊",
    color: "#FFD93D",
  },
  {
    id: "excited",
    name: "Excited",
    icon: "🎉",
    color: "#FF6B6B",
  },
  {
    id: "calm",
    name: "Calm",
    icon: "😌",
    color: "#95E1D3",
  },
  {
    id: "sad",
    name: "Sad",
    icon: "😢",
    color: "#A8B8C1",
  },
  {
    id: "angry",
    name: "Angry",
    icon: "😠",
    color: "#FF7675",
  },
];

export const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";
export const API_KEY = "5ef8b91ad25742cd9bf7b29f7cab60a9";
