const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth / 1.2;
const height = window.innerHeight / 1.2;

canvas.width = width;
canvas.height = height;


//start

let grid = [];
let steps = [];
let current;

let size = 60;

let mazeTimer = 1;
let MazeTimerFast = true;

//maak eerste de grid
setup();
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

  current = grid[0];
}

//maze timer voor repeating van het script
function MazeGenTimer() {
  if (MazeTimerFast) {
    setTimeout(function() {
      if (OptionsLeft()) {
        MazeGenerator();
        Draw();
      }
    }, 1);
  } else {
    setTimeout(function() {
      if (OptionsLeft()) {
        MazeGenerator();
        Draw();
      }
    }, size * mazeTimer);
  }
}

//draw function drawed alles.
function Draw() {
  context.clearRect(0, 0, width, height);
  //als er nog legen dingen zijn laat hij zien waar hij momenteel is
  if (OptionsLeft()) {
    ShowCurrent();
  }
  //loopt door alle vakjes en zorgt dat ze drawen
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
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
      Draw();
      MazeGenTimer();
    }
    //als next undefined is kijken we of je we stappen naar achter kunnen.
  } else {
    if (steps.length > 0) {
      current = steps.pop();
      if (OptionsLeft()) {
        Draw();
        MazeGenTimer();
      }
    }
  }
  Draw();
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

//standaard hulp functions voor het niet herhalen van dingen

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






// fun code
let startposition = grid[0];
let eindposition = grid[grid.length - 1];
let number = 0;
let currentLocationAI = eindposition;
currentLocationAI.path = true;

let showPath = false;

function startAI() {
  if (OptionsLeft()) {
    console.log("maze is nog niet af");
    return;
  }
  for (let i = 0; i < grid.length; i++) {
    grid[i].visited = false;
  }
  startposition.number = 0;
  startposition.visited = true;
  // startposition.drawtext();

  updateAI();
}

function updateAI() {
  setTimeout(function() {
    if (!(OptionsLeft())) {
        if (currentLocationAI.number == 0) {
          currentLocationAI.path = true;
          drawPath();
          return;
        }
        CreatePath();

    }
    number++;
    //wat moet er gebeuren als de AI nog niet op de eind locatie is

    //wat moet er gebeuren als de AI nog niet op de eind locatie is
    context.clearRect(0, 0, width, height);
    //wat moet er gebeuren voordat ik weer ga drawen (next berekenen)
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].number == number - 1) {
        grid[i].checkNeighborsAI();
      }
    }

    //teken het hele canvas opnieuw
    for (let drawgridcount = 0; drawgridcount < grid.length; drawgridcount++) {
      grid[drawgridcount].draw();
    }
    updateAI();
    // drawVisited();

  }, 10)
}

function CreatePath() {
  currentLocationAI.path = true;
  //alles wat er moet gebeuren om het pad te tekenen
  let nextAI = currentLocationAI.checkNeighborsForPath();
  currentLocationAI = nextAI;
  drawPath();
}

function drawPath() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawPath();
    drawmap();
    // drawVisited();
  }
}

function drawVisited() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].visited == true) {
      grid[i].drawtext();
    }
  }
}

function drawmap() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
}
