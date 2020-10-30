const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { on } = require('process');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, 'public')));


//variables 
let games = [];
makeGame = function (socketid, private, name, password) {
  let game = {};

  game.speler1 = {};
  game.speler1.id = socketid;
  game.speler1.name = null;
  game.speler1.host = true;

  game.speler2 = {};
  game.speler2.id = null;
  game.speler2.name = null;
  game.speler2.host = false;

  game.name = name;
  game.password = password || null;
  game.isPrivated = private;
  game.maxPlayers = 2;

  console.log(game);
  games.push(game);
};

//run when a client connects
io.on('connection', socket => {
  //runs when a client disconnects
  socket.on('disconnect', function () {
    console.log('a user disconnected from the server');
  });
  console.log("new websocket connection");

  socket.on('createServer', function(private, name, password){
    makeGame(socket.id, private, name, password);
  });

  //testing functions
  socket.on("testing", ()=>{
    console.log(games);
  });
});

const PORT = 3000 || process.env.port;

server.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});