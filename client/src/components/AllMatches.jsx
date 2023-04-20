import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import Match from "./Match";
import { useNavigate } from "react-router-dom";
import BackIcon from "@mui/icons-material/Backspace";

function AllMatches(props) {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/getMatches/${props.gameTitle}`).then((response) => {
      setMatches(response.data);
    });
  }, [props.gameTitle]);

  if (matches) {
    return (
      <div>
        <Stack direction={"row"} justifyContent="center" spacing={1}>
          <IconButton
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={() => {
              navigate(`/`);
            }}
          >
            <BackIcon />
          </IconButton>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate(`/add-match/${props.gameTitle}`);
            }}
          >
            Add Match
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate(`/leaderboard/${props.gameTitle}`);
            }}
          >
            {props.gameTitle} Leaderboard
          </Button>
        </Stack>
        <Grid container spacing={0}>
          {matches.map((match) => {
            return (
              <Grid item md={3} xs={6} lg={3} xl={2} key={match.Id}>
                <Match match={match} gameTitle={props.gameTitle} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  } else {
    return (
      <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }
}

export default AllMatches;
