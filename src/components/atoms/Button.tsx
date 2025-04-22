import React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';

export interface CustomButtonProps extends ButtonProps {
  rounded?: boolean;
  id?: string;
  children: React.ReactNode;
}

const Button: React.FC<CustomButtonProps> = ({
  rounded,
  id,
  children,
  variant = 'contained',
  ...rest
}) => {
  return (
    <MuiButton
      variant={variant}
      data-testid={id}
      sx={{
        borderRadius: rounded ? '25px' : '8px',
        textTransform: 'none',
        padding: '8px 24px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;