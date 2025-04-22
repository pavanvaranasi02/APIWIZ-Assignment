import axios from "axios";
import { API_BASE_URL, API_KEY } from "../constants";

export const weatherService = {
  getCurrentWeather: async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching weather:", error);
      throw error;
    }
  },
};
