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
  game.speler1.x = 20;
  game.speler1.y = 250;
  game.speler1.score = 0;

  game.speler2 = {};
  game.speler2.id = null;
  game.speler2.x = canvas.width - 40;
  game.speler2.y = 250;
  game.speler2.score = 0;

  game.ball = {};
  game.ball.x = canvas.width / 2;
  game.ball.y = canvas.height / 2;
  game.ball.speed = 30;
  game.ball.radius = 20;
  game.ball.speedX = -0.3;
  game.ball.speedY = -0.1;

  game.ball.update = function() {
    //wall (bovenkant / onderkant) collision check
    for (let i = 0; i < game.ball.speed; i++) {
      if (game.ball.y + game.ball.radius >= canvas.height || game.ball.y - game.ball.radius <= 0) {
        game.ball.speedY = -game.ball.speedY;
      }
      //speler controlle
      if (game.ball.x + game.ball.radius >= game.speler2.x && game.ball.y - game.ball.radius <= game.speler2.y + spelerSize.height && game.ball.y + game.ball.radius >= game.speler2.y) {
        game.ball.speedX = -game.ball.speedX;
      }
      if (game.ball.x - game.ball.radius <= game.speler1.x + spelerSize.width && game.ball.y - game.ball.radius <= game.speler1.y + spelerSize.height && game.ball.y + game.ball.radius >= game.speler1.y) {
        game.ball.speedX = -game.ball.speedX;
      }
      //score collision controlle
      if (game.ball.x - game.ball.radius <= game.speler1.x + spelerSize.width - 1) {
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height / 2;
        game.ball.speedX = -game.ball.speedX;
        game.speler2.score += 1;
      }
      if (game.ball.x + game.ball.radius >= game.speler2.x + 1) {
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height / 2;
        game.ball.speedX = -game.ball.speedX;
        game.speler1.score += 1;
      }

      //verander position van de ball.
      game.ball.x += game.ball.speedX;
      game.ball.y += game.ball.speedY;
    }
  };
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
      if (socket.id == games[i].speler1.id) {
        games[i].speler1.id = null;
      }
      if (socket.id == games[i].speler2.id) {
        games[i].speler2.id = null;
      }
    }
  });
  //ON CONNECT
    let foundgame = false;
    for (let i = 0; i < games.length; i++) {
      if (foundgame != true) {
        if (games[i].speler1.id == null) {
          games[i].speler1.id = socket.id;
          foundgame = true;
          io.to(socket.id).emit("setup", i, 1, games[i].ball.radius, games[i].ball.x, games[i].ball.y);
        } else if (games[i].speler2.id == null) {
          games[i].speler2.id = socket.id;
          foundgame = true;
          io.to(socket.id).emit("setup", i, 1, games[i].ball.radius, games[i].ball.x, games[i].ball.y);
        }
      }
    }

    if (!(foundgame)) {
      makeGame();
      for (let i = 0; i < games.length; i++) {
        if (foundgame != true) {
          if (games[i].speler1.id == null) {
            games[i].speler1.id = socket.id;
            io.to(socket.id).emit("setup", i, 1, games[i].ball.radius, games[i].ball.x, games[i].ball.y);
          } else if (games[i].speler2.id == null) {
            games[i].speler2.id = socket.id;
            io.to(socket.id).emit("setup", i, 1, games[i].ball.radius, games[i].ball.x, games[i].ball.y);
          }
        }
      }
    }
  //kijkt of de speler alleen zit of met iemand anders
  WaitingCheck();

  function WaitingCheck() {
    for (let i = 0; i < games.length; i++) {
      if (games[i].speler1.id == null || games[i].speler2.id == null) {
        games[i].speler1.score = 0;
        games[i].speler2.score = 0;
        games[i].ball.x = canvas.width / 2;
        games[i].ball.y = canvas.height / 2;
        if (games[i].speler1.id == null) {
          io.to(games[i].speler2.id).emit("waiting");
        }
        if (games[i].speler2.id == null) {
          io.to(games[i].speler1.id).emit("waiting");
        }
      } else {
        games[i].ball.update();
        io.to(games[i].speler1.id).emit("update", games[i].ball.x, games[i].ball.y, games[i].speler1.y, games[i].speler2.y, games[i].speler1.score, games[i].speler2.score);
        io.to(games[i].speler2.id).emit("update", games[i].ball.x, games[i].ball.y, games[i].speler1.y, games[i].speler2.y, games[i].speler1.score, games[i].speler2.score);
      }
    }
  }
  if (updatestarted == false) {
    updatestarted = true;
    setInterval(WaitingCheck, 10);
  }

  socket.on("mousemove", function(y) {
    for (let i = 0; i < games.length; i++) {
      if (socket.id == games[i].speler1.id) {
        games[i].speler1.y = y;
      } else if (socket.id == games[i].speler2.id) {
        games[i].speler2.y = y;
      }
    }
  });
});
