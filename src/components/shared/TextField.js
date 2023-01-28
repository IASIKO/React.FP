import { TextField, Typography } from '@mui/material'
import React from 'react'

export const TextFieldComponent = ({name, label, value, onChange, error}) => {
  return (
    <TextField
    variant='outlined'
    margin='dense'
    fullWidth
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    error={!!error}
    helperText={
      <Typography component="span" variant="body2">
        {error}
      </Typography>
    }
    />
  )
}
