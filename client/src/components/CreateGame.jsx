import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Paper, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    <Paper variant="outlined">
      <TextField
        variant="outlined"
        label="Title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField
        variant="outlined"
        label="Picture URL"
        onChange={(e) => {
          setImageUrl(e.target.value);
        }}
      />
      <Button color="primary" variant="contained" onClick={handleClick}>
        Submit
      </Button>
    </Paper>
  );
}
