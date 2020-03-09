const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth / 1.1;
const height = window.innerHeight / 1.1;

canvas.width = width;
canvas.height = height;


//start

let grid = [];
let size = 20;

let drawing = false;
let mousePosX = 0;
let mousePosY = 0;
let color = "aliceblue";

let colorgrid = [];
let colorcols = 11;
let colorrows = 1;
let colorsize = size * 2;
let colors = ["red", "blue", "black", "orange", "purple", "grey", "green", "yellow", "pink", "darkgray", "lightblue"]

setup();


function setup() {
  //maakt de grid floor zodat je geen halfe cubes krijgt.
  let cols = Math.floor((width - size * 2) / size);
  let rows = Math.floor(height / size);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let c = new Cell(i * size, j * size);
      grid.push(c);
    }
  }

  for (let cc = 0; cc < colorcols; cc++) {
    for (let cr = 0; cr < colorrows; cr++) {
      let colorcell = new Cell((width - size * 2 ) + cr, cc * colorsize);
      colorcell.color = colors[cc];
      colorgrid.push(colorcell);
    }
  }


  current = grid[0];
  draw();
}

function draw() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawlines();
  }
  for(let j = 0; j < colorgrid.length; j++){
    colorgrid[j].drawFillcolorgrid();
  }
}

//event listeners
//onmouse move save the location of my mouse
document.onmousemove = function(e) {
  mousePosX = e.pageX;
  mousePosY = e.pageY;
  if (drawing) {
    for (let i = 0; i < grid.length; i++) {
      if (mousePosX > grid[i].x && mousePosX < grid[i].x + size) {
        if (mousePosY > grid[i].y && mousePosY < grid[i].y + size) {
          grid[i].color = color;
          grid[i].drawFillgrid();
        }
      }
    }
  }
};
//on mouse down check if its on a circle an set it to draggable
document.onmousedown = function(e) {
  drawing = true;

  for (let j = 0; j < colorgrid.length; j++) {
    if (mousePosX > colorgrid[j].x && mousePosX < colorgrid[j].x + colorsize) {
      if (mousePosY > colorgrid[j].y && mousePosY < colorgrid[j].y + colorsize) {
        color = colors[j];
        return;
      }
    }
  }

  for (let i = 0; i < grid.length; i++) {
    if (mousePosX > grid[i].x && mousePosX < grid[i].x + size) {
      if (mousePosY > grid[i].y && mousePosY < grid[i].y + size) {
        grid[i].color = color;
        grid[i].drawFillgrid();
        return;
      }
    }
  }


};
//on mouse up check if there is a circle that gets dragged an set is back to false
document.onmouseup = function(e) {
  drawing = false;
};



//functies to make my live simple ;D

//returned een random integer tussen je aangegeven numbers
function GetRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//draws a line
function Line(x1, y1, x2, y2, color = "black") {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}
