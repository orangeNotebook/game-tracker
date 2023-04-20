import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { Button, IconButton, Paper, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BackIcon from "@mui/icons-material/Backspace";

export default function CreateMatch(props) {
  const [players, setPlayers] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [places, setPlaces] = useState([]);

  let playerInput = [];
  const navigate = useNavigate();

  function handleClick() {
    async function apifunc() {
      const data = {
        inputTerms: {
          gameTitle: props.gameTitle,
          image: "https://www.pngkey.com/png/detail/233-2332677_ega-png.png",
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
      <Stack direction={{ md: "row", xs: "column" }} spacing={1} key={i}>
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
      <IconButton
        sx={{ float: "right", height: "40px", marginTop: "10px" }}
        variant="contained"
        color="error"
        onClick={() => {
          navigate(`/game/${props.gameTitle}`);
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
