import React from "react";
import { Box } from "@mui/material";
import JournalEntryCard from "../molecules/JournalEntryCard";
import Typography from "../atoms/Typography";
import FilterChips from "../molecules/FilterChips";
import { JournalEntry } from "../../types";

interface JournalListProps {
  entries: JournalEntry[];
  onFilterChange: (mood: string) => void;
  selectedFilter: string;
}

const JournalList: React.FC<JournalListProps> = ({
  entries,
  onFilterChange,
  selectedFilter,
}) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Your Journal Entries
      </Typography>

      <FilterChips
        selectedMood={selectedFilter}
        onSelect={onFilterChange}
        sx={{ mb: 3 }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {entries.map((entry) => (
          <JournalEntryCard
            key={entry.id}
            id={entry.id}
            date={entry.date}
            mood={entry.mood}
            note={entry.note}
            weather={{
              temperature: entry.weather.main.temp,
              icon: entry.weather.weather[0].icon,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default JournalList;
