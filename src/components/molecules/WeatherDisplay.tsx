import React from 'react';
import { Box, BoxProps } from '@mui/material';
import WeatherIcon from '../atoms/WeatherIcon';
import Typography from '../atoms/Typography';

export interface WeatherDisplayProps extends BoxProps {
  temperature?: number;
  condition?: string;
  icon?: string;
  id?: string;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  temperature,
  condition,
  icon,
  id,
  ...rest
}) => {
  return (
    <Box
      data-testid={id}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
      {...rest}
    >
      <WeatherIcon size="large">
        {icon}
      </WeatherIcon>
      <Box>
        <Typography variant="h6">
          {temperature}°C
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {condition}
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherDisplay;