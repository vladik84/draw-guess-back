var express = require("express");
var router = express.Router();

const games = {};

router.post("/connect", function (req, res) {
  const runningGames = Object.values(games);
  let gameObject = runningGames.find((gameObject) => gameObject.players === 1);

  if (gameObject === undefined) {
    const gameId = Math.floor(Math.random() * 100000);
    gameObject = {
      gameId,
      players: 1,
    };

    games[gameId] = gameObject;
  } else {
    gameObject.players++;
  }

  res.status(200).send(gameObject);
});

router.get("/games/:gameId/players", (req, res) => {
  const gameId = req.params.gameId;

  res.status(200).send({
    players: games[gameId].players,
  });
});

router.post("/games/:gameId/draw", (req, res) => {
  const gameId = req.params.gameId;
  games[gameId].word = req.body.word;
  games[gameId].draw = req.body.draw;
  res.status(200).send({});
});

router.get("/games/:gameId/draw", (req, res) => {
  const gameId = req.params.gameId;
  res.status(200).send({
    word: games[gameId].word,
    draw: games[gameId].draw,
  });
});

module.exports = router;