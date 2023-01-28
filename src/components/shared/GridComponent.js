import { Grid } from "@mui/material";
import React from "react";

export const GridComponent = ({children}) => {
  return (
    <Grid container spacing={4} sx={{ width: "100%" }}>
      {children}
    </Grid>
  );
};
