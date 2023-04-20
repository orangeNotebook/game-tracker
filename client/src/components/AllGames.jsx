import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./Game";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AllGames(props) {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/getGames").then((response) => {
      setGames(response.data);
    });
  }, []);

  if (games) {
    return (
      <div>
        <Stack direction={"row"} justifyContent="center" spacing={1}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate("/add-game");
            }}
          >
            Add
          </Button>
        </Stack>
        <Grid container spacing={0}>
          {games.map((game) => {
            return (
              <Grid item md={3} xs={6} lg={3} xl={2} key={game.Id}>
                <Game game={game} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default AllGames;
