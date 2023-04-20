import { IconButton, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

function Header() {
  const navigate = useNavigate();

  return (
    <Paper variant="outlined" sx={{ marginBottom: "10px", padding: "10px" }}>
      <Stack direction={"row"} spacing={1}>
        <IconButton
          color="primary"
          variant="contained"
          onClick={() => {
            navigate("/");
          }}
        >
          <HomeIcon />
        </IconButton>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ paddingTop: "4px" }}
        >
          Game Tracker
        </Typography>
      </Stack>
    </Paper>
  );
}

export default Header;
