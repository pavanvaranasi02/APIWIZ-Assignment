import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps & {
  id?: string;
};

const Input: React.FC<InputProps> = ({ id, ...rest }) => {
  return (
    <TextField
      data-testid={id}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          '&:hover fieldset': {
            borderColor: (theme) => theme.palette.primary.main,
          },
        },
        '& .MuiOutlinedInput-input': {
          padding: '12px 16px',
        },
      }}
      {...rest}
    />
  );
};

export default Input;