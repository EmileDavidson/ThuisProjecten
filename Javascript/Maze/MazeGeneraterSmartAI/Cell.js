class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;

    this.number = null;
    this.walls = [true, true, true, true];

    this.path = false;
    this.backgroundcolor = null;
  }


  checkNeighbors() {
    let neighbors = [];

    let topWall = grid[Index(this.x, this.y - size)];
    let rightWall = grid[Index(this.x + size, this.y)];
    let bottomWall = grid[Index(this.x, this.y + size)];
    let leftWall = grid[Index(this.x - size, this.y)];



    if (topWall && !topWall.visited) {
      neighbors.push(topWall);

    }
    if (rightWall && !rightWall.visited) {
      neighbors.push(rightWall);
    }
    if (bottomWall && !bottomWall.visited) {
      neighbors.push(bottomWall);
    }
    if (leftWall && !leftWall.visited) {
      neighbors.push(leftWall);
    }

    if (neighbors.length > 0) {
      let r = Math.floor(GetRandomInt(0, neighbors.length - 1));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  draw() {
    if (this.walls[0] == true) {
      Line(this.x, this.y, this.x + size, this.y);
    }
    if (this.walls[1] == true) {
      Line(this.x + size, this.y, this.x + size, this.y + size);
    }
    if (this.walls[2] == true) {
      Line(this.x + size, this.y + size, this.x, this.y + size);
    }
    if (this.walls[3] == true) {
      Line(this.x, this.y + size, this.x, this.y);
    }
  }

  drawBackground(){
    if(this.backgroundcolor != null){
      context.beginPath();
      context.fillStyle = "aliceblue";
      context.fillRect(this.x, this.y, size,size)
      context.closePath();
      context.fill();
    }
  }

  //fun code
  drawtext() {
    if (this.number != null) {
      context.beginPath();
      context.font = "10px Arial";
      context.fillText(this.number, this.x + (size / 15), this.y + size - (size / 4));
      context.closePath();
    }
  }

  checkNeighborsAI() {
    let neighborsAI = [];

    let top = grid[Index(this.x, this.y - size)];
    let right = grid[Index(this.x + size, this.y)];
    let bottom = grid[Index(this.x, this.y + size)];
    let left = grid[Index(this.x - size, this.y)];

    if (top && this.walls[0] == false && top.visited == false) {
      neighborsAI.push(top);
      top.visited = true;
      top.number = number;
        top.backgroundcolor = "aliceblue";
    }
    if (right && this.walls[1] == false && right.visited == false) {
      // console.log("added topWall");
      neighborsAI.push(right);
      right.visited = true;
      right.number = number;
              right.backgroundcolor = "aliceblue";
    }
    if (bottom && this.walls[2] == false && bottom.visited == false) {
      neighborsAI.push(bottom);
      bottom.visited = true;
      bottom.number = number;
              bottom.backgroundcolor = "aliceblue";
    }
    if (left && this.walls[3] == false && left.visited == false) {
      neighborsAI.push(left);
      left.visited = true;
      left.number = number;
              left.backgroundcolor = "aliceblue";
    }

    if (neighborsAI.length > 0) {
      return neighborsAI;
    } else {
      return undefined;
    }
  }

  checkNeighborsForPath() {
    let topWall = grid[Index(this.x, this.y - size)];
    let rightWall = grid[Index(this.x + size, this.y)];
    let bottomWall = grid[Index(this.x, this.y + size)];
    let leftWall = grid[Index(this.x - size, this.y)];

    let nodigNummer = currentLocationAI.number - 1;

    if (topWall && topWall.number == nodigNummer) {
      return topWall;
    }
    if (rightWall && rightWall.number == nodigNummer) {
      return rightWall;
    }
    if (bottomWall && bottomWall.number == nodigNummer) {
      return bottomWall;
    }
    if (leftWall && leftWall.number == nodigNummer) {
      return leftWall;
    }
  }

  drawPath(){
    if(this.path == true){
      context.beginPath();
      context.fillStyle = "lightgray";
      context.fillRect(this.x, this.y, size, size);
      context.closePath();
      context.fill();
      context.fillStyle = "black";
    }
  }
}
