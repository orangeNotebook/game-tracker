import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Game(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/game/${props.game.Title}`);
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, margin: "10px" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={props.game.Image}
          alt={props.game.Title + " image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.game.Title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
