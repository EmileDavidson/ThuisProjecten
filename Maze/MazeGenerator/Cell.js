class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visited = false;

    this.walls = [true, true, true, true];
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


  //fun code

  checkNeighborsAI() {
    let topWall = grid[Index(this.x, this.y - size)];
    let rightWall = grid[Index(this.x + size, this.y)];
    let bottomWall = grid[Index(this.x, this.y + size)];
    let leftWall = grid[Index(this.x - size, this.y)];


    switch (ai_facing) {
      case "right":

        if (bottomWall && this.walls[2] == false) {
          // console.log("added bottomWall")
          ai_facing = "down";
          return bottomWall;
        }
        if (rightWall && this.walls[1] == false) {
          // console.log('added rightWall')
          ai_facing = "right";
          return rightWall;
        }
        if (topWall && this.walls[0] == false) {
          // console.log("added topWall");
          ai_facing = "up";
          return topWall;
        }
        if (leftWall && this.walls[3] == false) {
          // console.log('added leftWall')
          ai_facing = "left";
          return leftWall;
        }

        break;
      case "left":

      if (topWall && this.walls[0] == false) {
        // console.log("added topWall");
        ai_facing = "up";
        return topWall;
      }
      if (leftWall && this.walls[3] == false) {
        // console.log('added leftWall')
        ai_facing = "left";
        return leftWall;
      }
      if (bottomWall && this.walls[2] == false) {
        // console.log("added bottomWall")
        ai_facing = "down";
        return bottomWall;
      }
      if (rightWall && this.walls[1] == false) {
        // console.log('added rightWall')
        ai_facing = "right";
        return rightWall;
      }

        break;
      case "up":

      if (rightWall && this.walls[1] == false) {
        // console.log('added rightWall')
        ai_facing = "right";
        return rightWall;
      }
      if (topWall && this.walls[0] == false) {
        // console.log("added topWall");
        ai_facing = "up";
        return topWall;
      }
      if (leftWall && this.walls[3] == false) {
        // console.log('added leftWall')
        ai_facing = "left";
        return leftWall;
      }
      if (bottomWall && this.walls[2] == false) {
        // console.log("added bottomWall")
        ai_facing = "down";
        return bottomWall;
      }

        break;
      case "down":

      if (leftWall && this.walls[3] == false) {
        // console.log('added leftWall')
        ai_facing = "left";
        return leftWall;
      }
      if (bottomWall && this.walls[2] == false) {
        // console.log("added bottomWall")
        ai_facing = "down";
        return bottomWall;
      }
      if (rightWall && this.walls[1] == false) {
        // console.log('added rightWall')
        ai_facing = "right";
        return rightWall;
      }
      if (topWall && this.walls[0] == false) {
        // console.log("added topWall");
        ai_facing = "up";
        return topWall;
      }
        break;
    }


  }
}
