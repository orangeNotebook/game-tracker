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
  connection.query("SELECT * FROM games;", function (error, results) {
    res.send(results);
  });
});

app.get("/getMatches/:gameTitle", (req, res) => {
  let gameTitle = req.params.gameTitle;
  let value = [gameTitle];

  connection.query(
    "select `matches`.`Id`, `games`.`Title`, `games`.`Image` as 'GameImage', `matches`.`Date`, `matches`.`Image` as 'MatchImage' from `matches` join `games` on `games`.`Id` = `matches`.`GameId` where `Title` = ? order by `date`",
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
      if (i === inputTerms.players.length - 2) {
        query += "((SELECT MAX(Id) FROM `matches`), ?, ?)";
      } else {
        query += "((SELECT MAX(Id) FROM `matches`), ?, ?), ";
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
        function (err, res) {
          if (err) {
            console.error(err);
          }
          res.send(res);
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
