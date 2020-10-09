class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = "white";
  }

  drawlines() {
      Line(this.x, this.y, this.x + size, this.y);
      Line(this.x + size, this.y, this.x + size, this.y + size);
      Line(this.x + size, this.y + size, this.x, this.y + size);
      Line(this.x, this.y + size, this.x, this.y);
  }

  drawFillgrid(){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, size,  size);
    context.closePath();
    context.fill();
  }

  drawFillcolorgrid(){
    context.beginPath();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, colorsize,  colorsize);
    context.closePath();
    context.fill();
  }
}
