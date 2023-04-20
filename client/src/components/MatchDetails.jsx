import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import BackIcon from "@mui/icons-material/Backspace";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function MatchDetails(props) {
  const [players, setPlayers] = useState([]);
  const [match, setMatch] = useState([]);
  const [matchDate, setMatchDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/getMatchPlayers/${props.matchId}`).then((response) => {
      setPlayers(response.data);
    });
    axios.get(`/getMatch/${props.matchId}`).then((response) => {
      setMatch(response.data[0]);
      let date = new Date(response.data[0].Date);
      setMatchDate(date);
    });
  }, [props.matchId]);

  function deleteMatch() {
    async function apifunc() {
      const data = {
        matchId: match.Id,
      };
      try {
        await axios.post("/deleteMatch", data);
        navigate(`/game/${match.Title}`);
      } catch (err) {
        console.log(err);
      }
    }

    if (
      window.confirm(
        `Are you sure you want to delete this ${match.Title} match?`
      )
    ) {
      apifunc();
    }
  }

  if (players && match && matchDate) {
    return (
      <Grid container>
        <Grid item lg={0} xl={2}>
          <IconButton
            sx={{ float: "right" }}
            variant="contained"
            color="error"
            onClick={() => {
              navigate(`/game/${match.Title}`);
            }}
          >
            <BackIcon />
          </IconButton>
        </Grid>
        <Grid item lg={15} xl={8}>
          <Card variant="outlined" sx={{ margin: "10px" }}>
            <CardMedia
              component="img"
              height="500"
              image={match.GameImage}
              alt={match.Title + " match image"}
            />
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {match.Title}
              </Typography>

              <Typography gutterBottom variant="h5" component="div">
                {matchDate.toDateString()}
              </Typography>

              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Player</TableCell>
                      <TableCell align="right">Place</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow
                        key={player.Id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {player.Player}
                        </TableCell>
                        <TableCell align="right">{player.Place}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={0} xl={2}>
          {" "}
          <IconButton
            variant="contained"
            color="error"
            onClick={() => {
              deleteMatch();
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }
}

export default MatchDetails;
