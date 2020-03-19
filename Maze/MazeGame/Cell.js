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

  drawBackground(){
    if(this.backgroundcolor != null){
      context.beginPath();
      context.fillStyle = this.backgroundcolor;
      context.fillRect(this.x, this.y, size,size)
      context.closePath();
      context.fill();
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

  checkNeighbors() {
    let neighbors = [];

    let topWall = grid[Index(this.x, this.y - size)];
    let rightWall = grid[Index(this.x + size, this.y)];
    let bottomWall = grid[Index(this.x, this.y + size)];
    let leftWall = grid[Index(this.x - size, this.y)];



    if (topWall && !topWall.visited) {
      neighbors.push(topWall);
      // console.log("added topWall");
    }
    if (rightWall && !rightWall.visited) {
      neighbors.push(rightWall);
      // console.log('added rightWall')
    }
    if (bottomWall && !bottomWall.visited) {
      neighbors.push(bottomWall);
      // console.log("added bottomWall")
    }
    if (leftWall && !leftWall.visited) {
      neighbors.push(leftWall);
      // console.log('added leftWall')
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


  checkNeighborsPlayer(input) {
    console.log(input);
    let neighbors = [];

    let up = grid[Index(this.x, this.y - size)];
    let right = grid[Index(this.x + size, this.y)];
    let bottom = grid[Index(this.x, this.y + size)];
    let left = grid[Index(this.x - size, this.y)];



    if (up && input == 38 && this.walls[0] == false) {
      return up;
    }
    if (right && input == 39 && this.walls[1] == false) {
      return right;
    }
    if (bottom && input == 40 && this.walls[2] == false) {
      return bottom;
    }
    if (left && input == 37 && this.walls[3] == false) {
      return left;
    }

    return undefined;
  }


  //SmartAI

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
        top.backgroundcolor = "#F7D69D";
    }
    if (right && this.walls[1] == false && right.visited == false) {
      // console.log("added topWall");
      neighborsAI.push(right);
      right.visited = true;
      right.number = number;
              right.backgroundcolor = "#F7D69D";
    }
    if (bottom && this.walls[2] == false && bottom.visited == false) {
      neighborsAI.push(bottom);
      bottom.visited = true;
      bottom.number = number;
              bottom.backgroundcolor = "#F7D69D";
    }
    if (left && this.walls[3] == false && left.visited == false) {
      neighborsAI.push(left);
      left.visited = true;
      left.number = number;
              left.backgroundcolor = "#F7D69D";
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


}
