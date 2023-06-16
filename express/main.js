// Import the express module
const express = require("express");

const app = express();
var cors = require('cors')
app.use(express.json({ strict: false }));
app.use(cors());

app.get("/.auth/me", (req, res) => {
  res.json({ clientPrincipal: { userId: "7fho87eofh97", userDetails: "Massimo" } });
});

const games = []

app.put("/init", (req, res) => {
  const gameId = games.length + 1
  const val = Math.floor(Math.random() * 9000) + 1
  console.log(val)
  games.push(val)
  res.json(gameId);
});

app.post("/guess/:gameId", (req, res) => {
  const target = games[req.params.gameId - 1];
  const actual = req.body
  console.log(actual, target)
  if (actual < target) {
    res.json('go higher');
  } else if (actual > target) {
    res.json('go lower');
  } else {
    res.json('right-ho');
  }
});

// Start listening on port 3000
app.listen(3002, () => {
  console.log("Server is running on port 3000");
});
