import React from 'react';
import { Typography as MuiTypography, TypographyProps } from '@mui/material';

export interface TypoProps extends TypographyProps {
  variant: TypographyProps['variant'];
  color?: string;
  children: React.ReactNode;
  id?: string;
  component?: React.ElementType;
  bold?: boolean;
}

const Typography: React.FC<TypoProps> = ({
  variant,
  color,
  id,
  children,
  component,
  bold,
  ...rest
}) => {
  return (
    <MuiTypography
      variant={variant}
      color={color}
      data-testid={id}
      sx={{ fontWeight: bold ? 600 : 'inherit' }}
      {...(component && { component })}
      {...rest}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;