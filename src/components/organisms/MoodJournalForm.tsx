import React, { useState } from "react";
import { Box } from "@mui/material";
import MoodSelector from "../molecules/MoodSelector";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Typography from "../atoms/Typography";
import { JournalEntry, Weather } from "../../types";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { MOOD_OPTIONS } from "../../constants";

interface MoodJournalFormProps {
  onSubmit: (entry: JournalEntry) => void;
  weatherData?: Weather;
}

const MoodJournalForm: React.FC<MoodJournalFormProps> = ({
  onSubmit,
  weatherData,
}) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedMoodData = MOOD_OPTIONS.find((m) => m.id === selectedMood);

    if (selectedMoodData && weatherData) {
      const newEntry: JournalEntry = {
        id: uuidv4(),
        date: new Date().toISOString(),
        mood: selectedMoodData,
        weather: weatherData,
        note,
      };

      onSubmit(newEntry);

      setSelectedMood("");
      setNote("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        margin: "0 auto",
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 3,
          color: "#2C3E50",
          fontWeight: 500,
        }}
      >
        How are you feeling today?
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h6" sx={{ color: "#666" }}>
          {format(new Date(), "EEEE, MMMM d")}
        </Typography>

        {weatherData && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              backgroundColor: "white",
              padding: "12px 24px",
              borderRadius: 2,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5">{weatherData.main.temp}°C</Typography>
          </Box>
        )}
      </Box>

      <MoodSelector selectedMood={selectedMood} onSelect={setSelectedMood} />

      <Input
        multiline
        rows={4}
        placeholder="Write your thoughts..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
        sx={{
          mt: 2,
          mb: 4,
          "& .MuiOutlinedInput-root": {
            borderRadius: 4,
            backgroundColor: "white",
            "&:hover": {
              "& > fieldset": {
                borderColor: "primary.main",
              },
            },
          },
        }}
      />

      <Button
        type="submit"
        disabled={!selectedMood}
        sx={{
          py: 2,
          backgroundColor: selectedMood ? "#4A90E2" : "#E0E0E0",
          color: selectedMood ? "white" : "#666",
          fontSize: "1.1rem",
          fontWeight: 500,
          borderRadius: 3,
          textTransform: "uppercase",
          letterSpacing: 1,
          boxShadow: selectedMood
            ? "0 4px 12px rgba(74, 144, 226, 0.3)"
            : "none",
          "&:hover": {
            backgroundColor: selectedMood ? "#357ABD" : "#E0E0E0",
          },
        }}
      >
        Save Entry
      </Button>
    </Box>
  );
};

export default MoodJournalForm;
