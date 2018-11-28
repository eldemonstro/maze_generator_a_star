function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.revisited = false;
  this.colorSetted = false;
  this.currentColor = [];

  // Astar vars
  self.parent = parent
  self.g = 0
  self.h = 0
  self.f = 0

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  this.getNeighbors = function() {
    var neighbors = [];

    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];

    if (top && !this.walls[0]) {
      neighbors.push(top);
    }
    if (right && !this.walls[1]) {
      neighbors.push(right);
    }
    if (bottom && !this.walls[2]) {
      neighbors.push(bottom);
    }
    if (left && !this.walls[3]) {
      neighbors.push(left);
    }

    return neighbors;
  }

  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(0, 0, 255, 100);
    rect(x, y, w, w);
  }

  this.highlightPath = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }
    noStroke();
    fill(0, 255, 0, 100);
    rect(x, y, w, w);
  }

  this.highlightClosed = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }
    noStroke();
    fill('yellow');
    rect(x, y, w, w);
  }

  this.isTheSame = function(other) {
    return other.i == this.i && other.j == this.j
  }

  this.setColor = function(r, g, b, a) {
    this.colorSetted = true;
    this.currentColor = [r, g, b, a]
  }

  this.getColor = function() {
    fill(this.currentColor[0], this.currentColor[1], this.currentColor[2], this.currentColor[3])
  }

  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }

    if (this.colorSetted) {
      noStroke();
      this.getColor();
      rect(x, y, w, w)
    } else if (this.revisited) {
      noStroke();
      fill(255, 0, 126, 100);
      rect(x, y, w, w);
    } else if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, w, w);
    }
  }
}
