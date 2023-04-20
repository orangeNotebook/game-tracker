import React, { useEffect, useState } from "react";
import axios from "axios";
import Game from "./Game";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import BackIcon from "@mui/icons-material/Backspace";

function MainLeaderboard(props) {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    axios.get("/getAveragePlace").then((response) => {
      setPlayers(response.data);
    });
  }, []);

  if (players) {
    return (
      <Stack direction={{ md: "row", xs: "column" }} justifyContent="center">
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
        <TableContainer
          variant="outlined"
          component={Paper}
          sx={{ maxWidth: { md: "400px", xs: "auto" }, margin: "10px" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Player</TableCell>
                <TableCell align="right">Average Place</TableCell>
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
                  <TableCell align="right">
                    {Math.round(player.Place * 10) / 10}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  } else {
    return (
      <Typography variant="h4" component="div" sx={{ textAlign: "center" }}>
        Loading...
      </Typography>
    );
  }
}

export default MainLeaderboard;
