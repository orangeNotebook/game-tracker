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
    <Card variant="outlined" sx={{ margin: "10px" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          sx={{ aspectRatio: "5/3" }}
          image={
            props.game.Image ||
            "https://www.pngkey.com/png/detail/233-2332677_ega-png.png"
          }
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
