import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface MoodIconProps extends BoxProps {
  color: string;
  selected?: boolean;
  id?: string;
  children: React.ReactNode;
}

const MoodIcon: React.FC<MoodIconProps> = ({
  color,
  selected,
  id,
  children,
  ...rest
}) => {
  return (
    <Box
      data-testid={id}
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
        opacity: selected ? 1 : 0.7,
        transform: selected ? 'scale(1.1)' : 'scale(1)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          opacity: 1,
          transform: 'scale(1.1)',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default MoodIcon;