import {
  IconButton,
  InputAdornment,
  TextField,
  Grid2,
  OutlinedInput,
} from "@mui/material";

import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  name,
  half,
  handleChange,
  autoFocus,
  label,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid2 size={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        inputcomponent={
          <OutlinedInput
            endAdornment={
              name === "password" ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
        }
      />
    </Grid2>
  );
};

export default Input;
