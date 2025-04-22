import React from 'react';
import { Box, Chip } from '@mui/material';
import { MOOD_OPTIONS } from '../../constants';

interface MoodFilterProps {
  selectedMood: string | null;
  onMoodSelect: (moodId: string | null) => void;
}

const MoodFilter: React.FC<MoodFilterProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {MOOD_OPTIONS.map((mood) => (
        <Chip
          key={mood.id}
          label={mood.name}
          icon={<span>{mood.icon}</span>}
          onClick={() => onMoodSelect(selectedMood === mood.id ? null : mood.id)}
          sx={{
            backgroundColor: selectedMood === mood.id ? mood.color : 'transparent',
            borderColor: mood.color,
            border: '1px solid',
            '&:hover': {
              backgroundColor: `${mood.color}40`,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default MoodFilter;