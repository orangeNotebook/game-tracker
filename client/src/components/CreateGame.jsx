import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIcon from "@mui/icons-material/Backspace";

export default function CreateGame(props) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  function handleClick() {
    async function apifunc() {
      const data = {
        inputTerms: {
          title: title,
          image: imageUrl,
        },
      };
      try {
        await axios.put("/putGame", data);
        navigate(`/`);
      } catch (err) {
        console.log(err);
      }
    }
    apifunc();
  }

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      spacing={1}
      justifyContent="center"
      sx={{ margin: "10px" }}
    >
      <IconButton
        sx={{ float: "right", height: "40px", marginTop: "10px" }}
        variant="contained"
        color="error"
        onClick={() => {
          navigate(`/`);
        }}
      >
        <BackIcon />
      </IconButton>
      <Paper
        variant="outlined"
        sx={{ padding: "10px", maxWidth: { md: "500px", xs: "auto" } }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Add a Game
        </Typography>
        <Stack
          direction={{ md: "row", xs: "column", margin: "10px" }}
          justifyContent="center"
        >
          <TextField
            sx={{ margin: "10px" }}
            variant="outlined"
            label="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            sx={{ margin: "10px" }}
            variant="outlined"
            label="Picture URL"
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </Stack>
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ margin: "10px" }}
        >
          <Button color="primary" variant="contained" onClick={handleClick}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
