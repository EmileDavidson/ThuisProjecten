const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const { on } = require('process');
const { setInterval } = require('timers');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
//SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, 'public')));


//variables 
let games = [];
makeGame = function (socketid, private, name, password) {
  let game = {};
  game.spelers = [];
  //how many players are allowed to play
  for (let i = 0; i < 2; i++) {
    game.spelers.push(new player())
  }

  //the game is just created so player one is the person that created it
  game.spelers[0].id = socketid;
  game.spelers[0].host = true;

  game.name = name;
  game.password = password || null;
  game.isPrivated = private;
  game.isRunning = false;

  games.push(game);
};

//run when a client connects
io.on('connection', socket => {
  //runs when a client disconnects
  socket.on('disconnect', function () {
    console.log('a user disconnected from the server');
    playerLeft(socket, socket.id);
  });
  console.log("new websocket connection");

  socket.on('createServer', (private, name, password) => {
    makeGame(socket.id, private, name, password);
    checkForEnoughPlayers(socket, socket.id, false, 0, false);
  });

  //when a player leaves the game check if the game is empty to remove it.. else make the player that is left host.
  socket.on("leaved", () => {
    playerLeft(socket, socket.id);
  });
  socket.on("joinPrivateServer", (name, password) => {
    for (let i = 0; i < games.length; i++) {
      if (games[i].isPrivated) {
        //its a private match
        if (!(games[i].name == name)) continue;
        if (!(games[i].password == password)) continue;
        for (let j = 0; j < games[i].spelers.length; j++) {
          if (games[i].spelers[j].id == null) {
            console.log("joining as player: " + j);
            games[i].spelers[j].id = socket.id;
            io.to(socket.id).emit('matchFound');
            checkForEnoughPlayers(socket, socket.id, true, i, false)
            return;
          }
        }
        io.to(socket.id).emit('matchFoundFull');
        return;
      }
    }
    io.to(socket.id).emit('matchNotFound');
  });

  socket.on("checkForEnoughPlayers", () => {
    checkForEnoughPlayers(socket, socket.id, false, 0, false)
  });

  socket.on("joinPublicServer", (name) => {
    for(let i = 0; i < games.length; i++){
      if(!(games[i].name == name)) continue;
      //game found
      for(let j = 0; j < games[i].spelers.length; j++){
        //loop thruw all players an check if there is a spot left
          if(games[i].spelers[j].id == null){
            //found a spot
            console.log("joining as player: " + j);
            games[i].spelers[j].id = socket.id;
            io.to(socket.id).emit('matchFound');
            checkForEnoughPlayers(socket, socket.id, true, i, false);
            return;
          }
      }
      //game is full
      io.to(socket.id).emit('matchFoundFull');
      return;
    }
    //game not found
    io.to(socket.id).emit('matchNotFound');
    return;
  });

  socket.on("getAllPublicGames", ()=>{
    let publicGames = [];
    for(let i = 0 ; i < games.length; i++){
      if(games[i].isRunning) continue;        //game is already going (note. this means its full as well)
      if(games[i].isPrivated) continue; //game is private
      publicGames.push(games[i]);
    }
    if(publicGames.length <= 0){
      //no games found
      socket.emit("noPublicGamesFound");
      return;
    }
    socket.emit("sendingAllPublicGames", publicGames);
  })
  //testing functions
  socket.on("testing", () => {
    console.log(games);
  });



  //let the game begin.

  function update(){
    //what needs to happen for the game (canvas etc..)
    for(let i = 0; i < games.length; i++){
      //loop thruw all games 
      if(games[i].isRunning){
        //game is running so do what you want that happens in the game



        
      }
    }
  }

  setInterval(update, 10);
});

const PORT = 3000 || process.env.port;

server.listen(PORT, () => {
  console.log("server running on port: " + PORT);
});

function playerLeft(socket, socketId) {
  console.log("ik kom hier zeker weten");
  for (let i = 0; i < games.length; i++) {
    //loop thruw every game.
    console.log(games[i]);
    for (let j = 0; j < games[i].spelers.length; j++) {
      //loop thruw all players in the game.
      if (games[i].spelers[j].id == socketId) {
        //found the game the player was in.
        //setting the player that left to null in the game he was playing
        games[i].spelers[j].left();
        //now check if the game is empty.. (if its empty delete the game)
        for (let x = 0; x < games[i].spelers.length; x++) {
          //loop thruw every player in the game an check if its null
          if (games[i].spelers[x].id != null) {
            //there is still a player in the game
            checkForEnoughPlayers(socket, socketId, true, i, true);
            return;
          }
        }
        // there are no players in the game
        games.splice(i, 1);
        return;
      }
    }
  }
}

function checkForEnoughPlayers(socket, socketid, gameAlreadyFound, i, playerleft) {
  let gameNumber = null;
  if (gameAlreadyFound) { gameNumber = i }
  if (!gameAlreadyFound) {
    for (let x = 0; x < games.length; x++) {
      for (let j = 0; j < games[x].spelers.length; j++) {
        //loop thruw all players in the game.
        if (games[x].spelers[j].id == socketid) {
          //found the game the player is playing 
          gameNumber = x;
          break;
        }
      }
    }
  }
  if (gameNumber == null) return;
  //game is found

  for (let x = 0; x < games[gameNumber].spelers.length; x++) {
    //loop thruw every player again
    if (games[gameNumber].spelers[x].id == null) {
      //one of the players is missing
      for (let p = 0; p < games[gameNumber].spelers.length; p++) {
        console.log("ik kom ook hier");
        //loop thruw all player again an send them that they have to wait.
        socket.to(games[gameNumber].spelers[p].id).emit("loadWaitingLobby");
      }
      //all player know they have to wait.
      //if the sender didnt leave send this to him back (.to doesnt work for some reason)
      if (!playerleft) socket.emit("loadWaitingLobby");
      //the game stopped because there was one player missing
      //game is no longer running because there are not enough player
      games[gameNumber].isRunning = false;
      resetGame(gameNumber);
      return;
    }
  }
  //all players are there
  for (let p = 0; p < games[i].spelers.length; p++) {
    //loop thruw all player again an send them that they have to wait.
    //send it back to the sender ( .to() doesnt work.. )
    if (games[i].spelers[p].id == socketid) {
      socket.emit("loadGameCanvas");
    } else {
      socket.to(games[i].spelers[p].id).emit("loadGameCanvas");
    }
  }
  //every client in this game now loads game canvas
  //so the game can begin
  games[gameNumber].isRunning = true;
  return;
}

function resetGame(gameNumber){
  //if the game has to be reset (like the game data..)
  //do that here
  
}

class player {
  constructor() {
    this.id = null;
    this.host = false;
    this.score = 0
  }

  left() {
    this.id = null;
    this.host = false;
    this.score = 0;
  }
}