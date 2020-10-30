let socket = io();

const canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
//game page

socket.on('disconnect', function () {
  socket = null;
  alert("server down");
});

socket.on("matchNotFound", () => {
  alert("Game not found")
});

socket.on("matchFound", () => {
  loadGame();
});

socket.on("loadWaitingLobby", () => {
  console.log("ik kom hier wel.. dus wat gaat er fout?");
  disableAllCanvases();
  showMenu("menu2");
  activeById("waitingForOtherPlayer");
});

socket.on("loadGameCanvas", () => {
  disableAllCanvases();
  showMenu("menu2");
  activeById("canvas");
});

socket.on("matchFoundFull", () => {
  showMenu("menu")
  alert("game is full");
});

socket.on("updateGameCanvas", () =>{
  //what has to happen when updating the game canvas
  
})

socket.on("sendingAllPublicGames", (games)=>{
  console.log(games);
  console.log(games.length);
  document.getElementById("gamesList").innerHTML = "";
  for(let i = 0; i < games.length; i++){
    //loop thruw all games
    var node = document.createElement("LI"); 
    var textnode = document.createElement("button");
    textnode.setAttribute("onclick", "JoinServer(this)")
    var textnode2 = document.createTextNode(games[i].name);
    textnode.appendChild(textnode2)
    node.appendChild(textnode);
    document.getElementById("gamesList").appendChild(node);
  }

  // document.getElementById("gamesList");

  // let items = [];
  // for(let i = 0; i < games.leng)
  // let entry = document.createElement("li");
  
  // entry.appendChild(document.createTextNode(firstname))
  })
  
  socket.on('noPublicGamesFound', ()=>{
    document.getElementById("gamesList").innerHTML = "";
    alert("no public games found");
  })


