import React from "react";
import { CircularProgress, CircularProgressProps } from "@mui/material";

export interface LoadingSpinnerProps extends CircularProgressProps {
  size?: "small" | "medium" | "large";
  id?: string;
}

const spinnerSizeMap = {
  small: 24,
  medium: 40,
  large: 56,
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  id,
  ...rest
}) => {
  return (
    <CircularProgress
      data-testid={id}
      sx={{
        width: spinnerSizeMap[size],
        height: spinnerSizeMap[size],
      }}
      {...rest}
    />
  );
};

export default LoadingSpinner;
