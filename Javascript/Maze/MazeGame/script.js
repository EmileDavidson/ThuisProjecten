const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth / 1.2;
const height = window.innerHeight / 1.2;

canvas.width = width;
canvas.height = height;


//start
const myInput = document.getElementById('myInput');
let grid = [];
let steps = [];
let current;

let size = 60;

let mazeTimer = 1;
let MazeTimerFast = true;

//maak eerste de grid
setup();

//player first
let playerLocation = grid[0];
let eindlocation = grid[grid.length - 1];


window.addEventListener("keydown", function(e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

myInput.addEventListener('keydown', getInput, false);

function getInput(evt) {
  if (evt.key == "Enter") {
    if(isNaN(myInput.value) == false){
      if(parseInt(myInput.value) <= 20){
        myInput.value = "20";
      }
      if(Math.floor(width / parseInt(myInput.value)) <= 3){
        myInput.value = "";
        return;
      }

      size = parseInt(myInput.value);;
          resetall();
    }
    myInput.value = "";
  }
}


//player
DrawMap();

function DrawMap() {
  context.clearRect(0, 0, width, height);
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawBackground();
    grid[i].drawPath();
    grid[i].draw();
    if (i == grid.length - 1) {
      context.beginPath();
      context.fillStyle = "green";
      context.fillRect(grid[i].x + (size / 6), grid[i].y + (size / 6), size - (size / 3), size - (size / 3));
      context.closePath();
      context.stroke();
      context.fill();
    }
  }

  context.beginPath();
  context.fillStyle = "red";
  context.fillRect(playerLocation.x + (size / 4), playerLocation.y + (size / 4), size / 2, size / 2);
  context.closePath();
  context.stroke();
  context.fill();
}

addEventListener("keydown", (e) => {
  if (OptionsLeft()) {
    return;
  }
  let nextplayerlocation = playerLocation.checkNeighborsPlayer(e.keyCode);
  if (nextplayerlocation != undefined) {
    playerLocation = nextplayerlocation;
  }
  DrawMap();
  checkfinish();
});

function checkfinish() {
  if (playerLocation == eindlocation) {
    resetall();
  }
}


//maak de maze
//start daarna de complete generation
MazeGenerator();


function setup() {
  //maakt de grid floor zodat je geen halfe cubes krijgt.
  let cols = Math.floor(width / size);
  let rows = Math.floor(height / size);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let c = new Cell(i * size, j * size);
      grid.push(c);
    }
  }
  //player

  current = grid[0];

}

//maze timer voor repeating van het script
function MazeGenTimer() {
  if (MazeTimerFast) {
    setTimeout(function() {
      if (OptionsLeft()) {
        MazeGenerator();
        DrawMap();
      }
    }, 1);
  } else {
    setTimeout(function() {
      if (OptionsLeft()) {
        MazeGenerator();
        DrawMap();
      }
    }, size * mazeTimer);
  }
}

function MazeGenerator() {
  current.visited = true;

  let next = current.checkNeighbors();
  //kijken of er een next is (en dus niet undefined)
  if (next) {
    RemoveWalls(current, next);

    steps.push(current);
    current = next;

    if (OptionsLeft()) {
      DrawMap();
      MazeGenTimer();
    }
    //als next undefined is kijken we of je we stappen naar achter kunnen.
  } else {
    if (steps.length > 0) {
      current = steps.pop();
      if (OptionsLeft()) {
        DrawMap();
        MazeGenTimer();
      }
    }
  }
  DrawMap();
}

function RemoveWalls(a, b) {
  let x = a.x - b.x;

  if (x == size) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -size) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.y - b.y;
  if (y == size) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -size) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function ShowCurrent() {
  let x = current.x;
  let y = current.y;

  Line(x, y, x + size, y, "red");
  Line(x + size, y, x + size, y + size, "red");
  Line(x + size, y + size, x, y + size, "red");
  Line(x, y + size, x, y, "red");
}

//AI'S

//SMART AI

let number = 0;
let currentLocationAI = eindlocation;

function startSmartAI() {
  if (OptionsLeft()) {
    alert("wacht tot de maze helemaal gemaakt is");
    return;
  }

  //RESET alles
  number = 0;
  currentLocationAI = eindlocation;
  for (let i = 0; i < grid.length; i++) {
    grid[i].visited = false;
    grid[i].path = false;
    grid[i].number = null;
    grid[i].backgroundcolor = null;
  }
  DrawMap();
  let startposition = playerLocation;

  startposition.number = 0;
  startposition.visited = true;
  startposition.backgroundcolor = "#F7D69D";
  numberGrid();
}

function numberGrid() {
  setTimeout(function() {
    if (!(OptionsLeft())) {
      if (currentLocationAI.number == 0) {
        currentLocationAI.path = true;
        DrawMap();
        return;
      }
      CreatePath();
    } else {
      number++;
      context.clearRect(0, 0, width, height);

      for (let i = 0; i < grid.length; i++) {
        if (grid[i].number == number - 1) {
          grid[i].checkNeighborsAI();
        }
      }
    }
    DrawMap();
    numberGrid();
  }, 1)
}

function CreatePath() {
  currentLocationAI.path = true;
  //alles wat er moet gebeuren om het pad te tekenen
  let nextAI = currentLocationAI.checkNeighborsForPath();
  currentLocationAI = nextAI;
  DrawMap();
}

//

///

//

///

//


//standaard hulp functies voor het niet herhalen van dingen

function OptionsLeft() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].visited == false) {
      //als er nog een is die nog moet worden gevisit dan returned hij true
      return true;
    }
  }
  //returned standaard vals tenzij er een word gevonden die nog moet worden gevisit
  return false;
}

//voor het maken van een lijn
function Line(x1, y1, x2, y2, color = "black") {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

//kijkt waar je bent en of je alle kanten op kan
function Index(i, j) {
  let cols = Math.floor(width / size);
  let rows = Math.floor(height / size);

  let x = i / size;
  let y = j / size;

  if (x < 0 || y < 0 || x > cols - 1 || y > rows - 1) {
    return -1;
  }
  return Math.floor(x + y * cols);
}

//returned een random integer tussen je aangegeven numbers
function GetRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetall() {
  grid = [];
  steps = [];
  current;

  setup();
  MazeGenerator();

  playerLocation = grid[0];
  eindlocation = grid[grid.length - 1];

  number = 0;
  currentLocationAI = eindlocation;
}
