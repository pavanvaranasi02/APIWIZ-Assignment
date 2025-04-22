import React from 'react';
import { Card as MuiCard, CardProps } from '@mui/material';

export interface CustomCardProps extends CardProps {
  id?: string;
  children: React.ReactNode;
  hoverable?: boolean;
}

const Card: React.FC<CustomCardProps> = ({
  id,
  children,
  hoverable = true,
  ...rest
}) => {
  return (
    <MuiCard
      data-testid={id}
      sx={{
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        ...(hoverable && {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
          },
        }),
      }}
      {...rest}
    >
      {children}
    </MuiCard>
  );
};

export default Card;