var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


let games = [];
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
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    //ON DISCONNECT
    console.log('a user disconnected from the server');
    for (let i = 0; i < games.length; i++) {
      console.log("dit lukt nog 1");
      if (socket.id == games[i].speler1.id) {
        games[i].speler1.id = null;
        console.log("dit lukt nog 2");
      }
      if (socket.id == games[i].speler2.id) {
        games[i].speler2.id = null;
        console.log("dit lukt nog 3");
      }
    }
  });
  //ON CONNECT
  console.log("Client connected with id " + socket.id); {
    let foundgame = false;
    for (let i = 0; i < games.length; i++) {
      if (foundgame != true) {
        if (games[i].speler1.id == null) {
          console.log(socket.id + "joined the game with id " + i + " als speler 1");
          games[i].speler1.id = socket.id;
          foundgame = true;
          io.to(socket.id).emit("setup", i, 1);
        } else if (games[i].speler2.id == null) {
          console.log(socket.id + "joined the game with id " + i + " als speler 2");
          games[i].speler2.id = socket.id;
          foundgame = true;
          io.to(socket.id).emit("setup", i, 2);
        }
      }
    }

    if (!(foundgame)) {
      makeGame();
      for (let i = 0; i < games.length; i++) {
        if (foundgame != true) {
          if (games[i].speler1.id == null) {
            console.log(socket.id + "joined the game with id " + i + " speler 1");
            games[i].speler1.id = socket.id;
            io.to(socket.id).emit("setup", i, 1);
          } else if (games[i].speler2.id == null) {
            console.log(socket.id + "joined the game with id " + i + " speler 2");
            games[i].speler2.id = socket.id;
            io.to(socket.id).emit("setup", i, 2);
          }
        }
      }
    }
  }
  //kijkt of de speler alleen zit of met iemand anders
  WaitingCheck();

  function WaitingCheck() {
    for (let i = 0; i < games.length; i++) {
      if (games[i].speler1.id == null || games[i].speler2.id == null) {
        if (games[i].speler1.id == null) {
          io.to(games[i].speler2.id).emit("waiting");
        }
        if (games[i].speler2.id == null) {
          io.to(games[i].speler1.id).emit("waiting");
        }
      } else {
        io.to(games[i].speler1.id).emit("update");
        io.to(games[i].speler2.id).emit("update");
      }
    }
  }
  setInterval(WaitingCheck, 10);
});
