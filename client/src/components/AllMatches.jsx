import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./Game";
import { Button, Grid, Stack } from "@mui/material";
import Match from "./Match";
import { useNavigate } from "react-router-dom";

function AllMatches(props) {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/getMatches/${props.gameTitle}`).then((response) => {
      setMatches(response.data);
    });
  }, []);

  if (matches) {
    return (
      <div>
        <Stack direction={"row"} justifyContent="center" spacing={1}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate(`/add-match/${props.gameTitle}`);
            }}
          >
            Add
          </Button>
        </Stack>
        <Grid container spacing={0}>
          {matches.map((match) => {
            return (
              <Grid item md={3} xs={6} lg={3} xl={2} key={match.Id}>
                <Match match={match} />
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

export default AllMatches;
