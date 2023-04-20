import { Paper, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <Paper
      variant="outlined"
      sx={{ textAlign: "center", marginBottom: "10px" }}
    >
      <Typography variant="h4" component="h1">
        Game Tracker
      </Typography>
    </Paper>
  );
}

export default Header;
