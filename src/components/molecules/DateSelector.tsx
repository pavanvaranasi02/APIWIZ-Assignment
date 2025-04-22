import React from 'react';
import { Box, BoxProps } from '@mui/material';
import Typography from '../atoms/Typography';
import Button from '../atoms/Button';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { format } from 'date-fns';

export interface DateSelectorProps extends BoxProps {
  currentDate: Date;
  id?: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  currentDate,
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
        justifyContent: 'center',
      }}
      {...rest}
    >
      <Button variant="text">
        <ChevronLeft />
      </Button>
      <Typography variant="h6">
        {format(currentDate, 'MMMM dd, yyyy')}
      </Typography>
      <Button variant="text">
        <ChevronRight />
      </Button>
    </Box>
  );
};

export default DateSelector;