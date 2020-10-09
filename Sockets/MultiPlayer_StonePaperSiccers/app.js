var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let spelers = [];
for (let i = 0; i < 2; i++) {
  speler = {
    id: null,
    move: null
  }
  spelers.push(speler);
}
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    console.log('user disconnected');
    if (socket.id == spelers[0].id) {
      spelers[0].id = null;
    }
    if (socket.id == spelers[1].id) {
      spelers[1].id = null;
    }
  });

  if (spelers[0].id == null) {
    spelers[0].id = socket.id;
    io.to(spelers[0].id).emit("spelercheck", "speler1");
  } else if (spelers[1].id == null) {
    spelers[1].id = socket.id;
    io.to(spelers[1].id).emit("spelercheck", "speler2");
  }

  socket.on("inputgiven", function(move) {
    if (socket.id == spelers[0].id) {
      spelers[0].move = move;
      update();
    }
    if (socket.id == spelers[1].id) {
      spelers[1].move = move;
      update();
    }
  })

  function update() {
    if (spelers[0].move != null && spelers[1].move != null) {
      if (spelers[0].move == spelers[1].move) {;
        io.emit("update", "gelijkspel", spelers[0].move, spelers[1].move);
        spelers[0].move = null;
        spelers[1].move = null;
      }
      if (spelers[0].move == "schaar" && spelers[1].move == "steen" || spelers[0].move == "steen" && spelers[1].move == "papier" || spelers[0].move == "papier" && spelers[1].move == "schaar") {
        io.emit("update", "Speler 2 wint", spelers[0].move, spelers[1].move);
        spelers[0].move = null;
        spelers[1].move = null;
      }
      if ((spelers[1].move == "schaar" && spelers[0].move == "steen" || spelers[1].move == "steen" && spelers[0].move == "papier" || spelers[1].move == "papier" && spelers[0].move == "schaar")) {
        io.emit("update", "Speler 1 wint", spelers[0].move, spelers[1].move);
        spelers[0].move = null;
        spelers[1].move = null;
      }
    }
  }
});
