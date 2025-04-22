import React from "react";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";
import MoodIcon from "../atoms/MoodIcon";
import WeatherIcon from "../atoms/WeatherIcon";
import { Box } from "@mui/material";
import { format } from "date-fns";

export interface JournalEntryCardProps {
  date: string;
  mood: {
    name: string;
    color: string;
    icon: string;
  };
  weather: {
    temperature: number;
    icon: string;
  };
  note: string;
  id?: string;
}

const JournalEntryCard: React.FC<JournalEntryCardProps> = ({
  date,
  mood,
  weather,
  note,
  id,
}) => {
  return (
    <Card id={id}>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          {format(new Date(date), "MMMM dd, yyyy")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: 2 }}>
          <MoodIcon color={mood.color}>{mood.icon}</MoodIcon>
          <Typography variant="body1">{mood.name}</Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <WeatherIcon size="small">{weather.icon}</WeatherIcon>
          <Typography variant="body2">{weather.temperature}°C</Typography>
        </Box>

        <Typography variant="body1" color="text.secondary">
          {note}
        </Typography>
      </Box>
    </Card>
  );
};

export default JournalEntryCard;
