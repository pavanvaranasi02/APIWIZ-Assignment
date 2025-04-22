import React from "react";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { MOOD_OPTIONS } from "../../constants";
import { Mood } from "../../types";

export interface FilterChipsProps {
  selectedMood?: string;
  onSelect: (moodId: string) => void;
  id?: string;
  className?: string;
  sx?: SxProps<Theme>;
}

const FilterChips: React.FC<FilterChipsProps> = ({
  selectedMood,
  onSelect,
  id,
  sx,
  className,
}) => {
  return (
    <Box
      data-testid={id}
      className={className}
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        ...sx,
      }}
    >
      {MOOD_OPTIONS.map((mood: Mood) => (
        <Box
          key={mood.id}
          onClick={() => onSelect(mood.id)}
          sx={{
            padding: "8px 16px",
            borderRadius: 20,
            backgroundColor:
              selectedMood === mood.id ? mood.color : "transparent",
            border: `1px solid ${mood.color}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "all 0.3s ease",
          }}
        >
          <span>{mood.icon}</span>
          <span>{mood.name}</span>
        </Box>
      ))}
    </Box>
  );
};

export default FilterChips;
