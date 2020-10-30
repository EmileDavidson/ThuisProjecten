var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let canvas = {};
canvas.height = 600;
canvas.width = 1050;

let games = [];
let updatestarted = false;

//standaard dingen
let spelerSize = {};
spelerSize.width = 20;
spelerSize.height = 100;

makeGame = function() {
  let game = {};

  game.speler1 = {};
  game.speler1.id = null;

  game.speler2 = {};
  game.speler2.id = null;

  games.push(game);
};


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/style.css');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    //ON DISCONNECT
    console.log('a user disconnected from the server');
    for (let i = 0; i < games.length; i++) {
      if (socket.id == games[i].speler1.id) {
        games[i].speler1.id = null;
      }
      if (socket.id == games[i].speler2.id) {
        games[i].speler2.id = null;
      }
    }
  });
  //ON CONNECT

  //make sure the player gets in a game
  let foundgame = false;
  for (let i = 0; i < games.length; i++) {
    if (foundgame != true) {
      if (games[i].speler1.id == null) {
        games[i].speler1.id = socket.id;
        io.to(socket.id).emit("setup", i);
        foundgame = true;
      } else if (games[i].speler2.id == null) {
        games[i].speler2.id = socket.id;
        io.to(socket.id).emit("setup", i);
        foundgame = true;
      }
    }
  }

  //there wasnt a game available so we create one
  if (!(foundgame)) {
    makeGame();
    for (let i = 0; i < games.length; i++) {
      if (foundgame != true) {
        if (games[i].speler1.id == null) {
          games[i].speler1.id = socket.id;
          io.to(socket.id).emit("setup", i);
          foundgame = true;
        } else if (games[i].speler2.id == null) {
          games[i].speler2.id = socket.id;
          io.to(socket.id).emit("setup", i);
          foundgame = true;
        }
      }
    }
  }

  //start other code..
});
