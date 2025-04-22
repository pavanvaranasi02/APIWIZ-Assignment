import React from "react";
import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
import { MOOD_OPTIONS } from "../../constants";
import { Mood } from "../../types";
import Typography from "../atoms/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface MoodSelectorProps {
  selectedMood?: string;
  onSelect: (moodId: string) => void;
  id?: string;
  className?: string;
  sx?: SxProps<Theme>;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedMood,
  onSelect,
  id,
  sx,
  className,
}) => {
  const handleMoodSelect = (moodId: string) => {
    if (selectedMood === moodId) {
      onSelect("");
    } else {
      onSelect(moodId);
    }
  };

  return (
    <Box
      data-testid={id}
      className={className}
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
        flexWrap: "wrap",
        my: 4,
        ...sx,
      }}
    >
      {MOOD_OPTIONS.map((mood: Mood) => (
        <Box
          key={mood.id}
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {selectedMood === mood.id && (
            <Box
              sx={{
                position: "absolute",
                top: -10,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 1,
                backgroundColor: "black",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircleIcon
                sx={{
                  color: mood.color,
                  fontSize: 24,
                  filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))",
                }}
              />
            </Box>
          )}

          <Box
            onClick={() => handleMoodSelect(mood.id)}
            sx={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: mood.color,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              transform: selectedMood === mood.id ? "scale(1.1)" : "scale(1)",
              boxShadow:
                selectedMood === mood.id
                  ? "0 8px 16px rgba(0,0,0,0.2)"
                  : "0 4px 8px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              },
            }}
          >
            <Typography variant="h4" sx={{ mb: 1 }}>
              {mood.icon}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#2C3E50",
                fontWeight: selectedMood === mood.id ? 600 : 400,
              }}
            >
              {mood.name}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MoodSelector;
