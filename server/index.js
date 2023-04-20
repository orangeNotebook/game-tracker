const express = require("express");
const mysql_connector = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
require("dotenv").config();

const connection = mysql_connector.createConnection({
  host: process.env.HOSTNAME,
  user: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect();

//default path

app.get("/getGames", (req, res) => {
  connection.query(
    "SELECT * FROM games order by Title;",
    function (error, results) {
      res.send(results);
    }
  );
});

app.get("/getAveragePlace", (req, res) => {
  connection.query(
    "SELECT Id, Player, avg(Place) as Place FROM `game-leaderboard`.scores group by Player order by Place",
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.get("/getWinners/:gameTitle", (req, res) => {
  let gameTitle = req.params.gameTitle;
  let value = [gameTitle];

  connection.query(
    "SELECT Id, Player, count(Place) as Place FROM `game-leaderboard`.scores where MatchId in (select Id from matches where GameId = (select Id from games where Title = ?)) and Place = 1 group by Player order by Place desc",
    value,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.get("/getMatches/:gameTitle", (req, res) => {
  let gameTitle = req.params.gameTitle;
  let value = [gameTitle];

  connection.query(
    "select `matches`.`Id`, `games`.`Title`, `games`.`Image` as 'GameImage', `matches`.`Date`, `matches`.`Image` as 'MatchImage' from `matches` join `games` on `games`.`Id` = `matches`.`GameId` where `Title` = ? order by `date` desc",
    value,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.get("/getMatch/:matchId", (req, res) => {
  let matchId = req.params.matchId;
  let value = [matchId];

  connection.query(
    "select `matches`.`Id`, `games`.`Title`, `games`.`Image` as 'GameImage', `matches`.`Date`, `matches`.`Image` as 'MatchImage' from `matches` join `games` on `games`.`Id` = `matches`.`GameId` where `matches`.`Id` = ? order by `date`",
    value,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.get("/getMatchPlayers/:matchId", (req, res) => {
  let matchId = req.params.matchId;
  let value = [matchId];

  connection.query(
    "SELECT * FROM `game-leaderboard`.scores where MatchId = ? order by `Place`;",
    value,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.put("/putGame", (req, res) => {
  let { inputTerms } = req.body;

  let values = [[inputTerms.title], [inputTerms.image]];

  connection.query(
    "insert into games (`Title`, `Image`) values (?, ?)",
    values,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      res.send(results);
    }
  );
});

app.put("/putMatch", (req, res) => {
  let { inputTerms } = req.body;

  let current = new Date();
  let cDate =
    current.getFullYear() +
    "-" +
    (current.getMonth() + 1) +
    "-" +
    current.getDate();
  let cTime =
    current.getHours() +
    ":" +
    current.getMinutes() +
    ":" +
    current.getSeconds();
  let dateTime = cDate + " " + cTime;

  let values = [[inputTerms.gameTitle], [dateTime], [inputTerms.image]];

  function generatePlayerQuery() {
    let values = [];
    let query = "insert into `scores` (`MatchId`, `Place`, `Player`) values ";
    for (let i in inputTerms.players) {
      if (i < inputTerms.players.length - 1) {
        query += "((SELECT MAX(Id) FROM `matches`), ?, ?), ";
      } else {
        query += "((SELECT MAX(Id) FROM `matches`), ?, ?)";
      }
      values.push([inputTerms.places[i]]);
      values.push([inputTerms.players[i]]);
    }
    return { query: query, values: values };
  }

  connection.query(
    "insert into `matches` (`GameId`, `Date`, `Image`) values ((select `Id` from `games` where `Title` = ?), ?, ?)",
    values,
    function (error, results) {
      if (error) {
        console.error(error);
      }
      connection.query(
        generatePlayerQuery().query,
        generatePlayerQuery().values,
        function (err, results2) {
          if (err) {
            console.error(err);
          }
          res.send(results2);
        }
      );
    }
  );
});

app.post("/deleteMatch", (req, res) => {
  let { matchId } = req.body;
  connection.query(
    "delete from `scores` where MatchId = " + matchId,

    function (error, results) {
      if (error) {
        console.error(error);
      }
      connection.query(
        "delete from `matches` where Id = " + matchId,
        function (error2, results2) {
          if (error2) {
            console.error(error2);
          }
          res.send(results2);
        }
      );
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/", "index.html"));
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
