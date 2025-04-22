import React from 'react';
import { Box, BoxProps } from '@mui/material';

export interface WeatherIconProps extends BoxProps {
  size?: 'small' | 'medium' | 'large';
  id?: string;
  children: React.ReactNode;
}

const sizeMap = {
  small: '24px',
  medium: '36px',
  large: '48px',
};

const WeatherIcon: React.FC<WeatherIconProps> = ({
  size = 'medium',
  id,
  children,
  ...rest
}) => {
  return (
    <Box
      data-testid={id}
      sx={{
        width: sizeMap[size],
        height: sizeMap[size],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default WeatherIcon;