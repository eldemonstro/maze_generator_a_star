var cols, rows;
const w = 50;
const skip_steps = 1;

var grid = [];
var gen_current = null;
var gen_stack = [];

var completedMaze = false;
var completedSolve = false;

var start_node = null;
var end_node = null;
var open_list = [];
var closed_list = [];
var path = [];

function setup() {
  createCanvas(1600, 800);
  cols = floor(width/w);
  rows = floor(height/w);

  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  gen_current = grid[0];

  console.time('complete');
}

function draw() {
  background(51);

  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  if (!completedMaze) {
    for(var z = 0; z < skip_steps; z++) {
      gen_current.visited = true;
      gen_current.highlight();
      // STEP 1
      var next = gen_current.checkNeighbors();
      if (next) {
        next.visited = true;

        // STEP 2
        gen_stack.push(gen_current);

        // STEP 3
        removeWalls(gen_current, next);

        // STEP 4
        gen_current = next;
      } else if (gen_stack.length > 0) {
        gen_current.revisited = true;
        gen_current = gen_stack.pop();
      } else if (gen_stack.length == 0) {
        completedMaze = true;
      }
    }
  } else if(!completedSolve) {
    if(start_node == null) {
      start_node = grid[0];
      start_node.g = start_node.h = start_node.f = 0
      end_node = grid[grid.length - 1];
      end_node.g = end_node.h = end_node.f = 0
      open_list.push(start_node);
      return;
    }

    for(var z = 0; z < skip_steps; z++) {
      if(open_list.length > 0) {
        current_node = open_list[0];
        current_node.highlight();
        current_index = 0;
        for(var i = 0; i < open_list.length; i++) {
          if(open_list[i].f < current_node.f) {
            current_node = open_list[i];
            current_index = i;
          }
        }

        open_list.splice(current_index, 1);
        closed_list.push(current_node);

        if(current_node.isTheSame(end_node)) {
          path = [];
          current = current_node;
          while(current != null) {
            path.push(current);
            current = current.parent;
          }

          open_list = [];
          return;
        }

        var skip_loop;
        children = current_node.getNeighbors();

        for(var i = 0; i < children.length; i++) {

          for(var j = 0; j < closed_list.length; j++) {
            if(children[i].isTheSame(closed_list[j])) {
              skip_loop = true;
            }
          }

          if(skip_loop == true) {
            skip_loop = false;
            continue;
          }

          children[i].parent = current_node;

          children[i].g = current_node.g + 1;
          children[i].h = ((children[i].i - end_node.i) ** 2) + ((children[i].j - end_node.j) ** 2);
          children[i].f = children[i].g + children[i].h;

          for(var j = 0; j < open_list.length; j++) {
            if(children[i].isTheSame(open_list[j]) && children[i].g > open_list[j].g) {
              skip_loop = true;
            }
          }

          if(skip_loop == true) {
            skip_loop = false;
            continue;
          }

          console.log(z);

          open_list.push(children[i]);
        }
      } else {
        completedSolve = true;
        break;
      }
    }
    for(var i = 0; i < closed_list.length; i++) {
      closed_list[i].highlightClosed();
    }
    current_check = current_node;
    while(current_check != null) {
      current_check.highlightPath();
      current_check = current_check.parent;
    }
  } else {
    for(var i = 0; i < closed_list.length; i++) {
      closed_list[i].highlightClosed();
    }
    for(var i = 0; i < path.length; i++) {
      path[i].highlightPath();
    }
    noLoop();
    console.timeEnd('complete');
    console.log('rows: ', rows);
    console.log('cols: ', cols)
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
