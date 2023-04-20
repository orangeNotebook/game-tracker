import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./Game";
import { Grid } from "@mui/material";
import Match from "./Match";

function AllMatches(props) {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get(`/getMatches/${props.gameTitle}`).then((response) => {
      setMatches(response.data);
    });
  }, []);

  if (matches) {
    return (
      <div>
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
