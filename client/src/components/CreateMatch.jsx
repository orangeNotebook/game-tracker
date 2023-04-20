import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateMatch(props) {
  const [players, setPlayers] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [playerCount, setPlayerCount] = useState(1);
  const [places, setPlaces] = useState([]);

  let playerInput = [];
  const navigate = useNavigate();

  function handleClick() {
    async function apifunc() {
      const data = {
        inputTerms: {
          gameTitle: props.gameTitle,
          image: imageUrl
            ? imageUrl
            : "https://www.pngkey.com/png/detail/233-2332677_ega-png.png",
          players: players,
          places: places,
        },
      };
      try {
        await axios.put("/putMatch", data);
        navigate(`/game/${props.gameTitle}`);
      } catch (err) {
        console.log(err);
      }
    }
    apifunc();
  }

  for (let i = 0; i < playerCount; i++) {
    playerInput.push(
      <Stack direction={{ md: "row", xs: "column" }} spacing={1}>
        <TextField
          variant="outlined"
          label={"Player " + (i + 1)}
          onChange={(e) => {
            let tempPlayers = players;
            tempPlayers[i] = e.target.value;
            setPlayers(tempPlayers);
          }}
        />
        <TextField
          variant="outlined"
          label={"Player " + (i + 1) + " Place"}
          onChange={(e) => {
            let tempPlace = places;
            tempPlace[i] = e.target.value;
            setPlaces(tempPlace);
          }}
        />
      </Stack>
    );
  }

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      spacing={1}
      justifyContent="center"
      sx={{ margin: "10px" }}
    >
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
          Add a Match
        </Typography>
        <Stack direction={"column"} spacing={1} sx={{ margin: "10px" }}>
          {playerInput}
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ margin: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => setPlayerCount(playerCount + 1)}
            >
              Add a player
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                if (playerCount > 1) {
                  setPlayerCount(playerCount - 1);
                }
              }}
            >
              Remove a player
            </Button>
          </Stack>
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
