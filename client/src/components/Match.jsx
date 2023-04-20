import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Match(props) {
  const navigate = useNavigate();

  const matchDate = new Date(props.match.Date);

  function handleClick() {
    navigate(`/match-details/${props.gameTitle}/${props.match.Id}`);
  }

  return (
    <Card variant="outlined" sx={{ maxWidth: 345, margin: "10px" }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="200"
          image={props.match.GameImage}
          alt={props.match.Title + " match image"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {matchDate.toDateString()} at {matchDate.getHours()}:
            {matchDate.getMinutes()} {matchDate.getHours() >= 12 ? "pm" : "am"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
