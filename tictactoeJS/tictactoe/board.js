var Board = function() {
  this.grid = [[" ", " ", " "],
               [" ", " ", " "],
               [" ", " ", " "]];
               
 this.winners = [[[0,0],[0,1],[0,2]],
                 [[1,0],[1,1],[1,2]],
                 [[2,0],[2,1],[2,2]],
                 [[0,0],[1,0],[2,0]],
                 [[0,1],[1,1],[2,1]],
                 [[0,2],[1,2],[2,2]],
                 [[0,0],[1,1],[2,2]],
                 [[0,2],[1,1],[2,0]]];
}

Board.prototype.print = function() {
  this.grid.forEach(function(row) {
    console.log(row);
  });
  console.log();
};

Board.prototype.placeMarker = function(row, col, marker) {
  if (this.validPlace(row, col)) {
    this.grid[row][col] = marker
    return true;
  } else {
    return false;
  }
};

Board.prototype.validPlace = function(row, col) {
  if (this.grid[row][col] === " ") {
    return true;
  } else {
    return false;
  }
};

Board.prototype.markerAtPlace = function(coords) {
  return this.grid[coords[0]][coords[1]];
};


Board.prototype.tied = function() {
  var isTied = true;
  var flattened = this.grid.reduce(function(a, b) {
    return a.concat(b);
  });
  flattened.forEach( function(square) {
    if (square == " ") {
      isTied = false;
    }
  });
  return isTied;
};

Board.prototype.winner = function() {
  var isWon = " ";
  var that = this;
  this.winners.forEach( function(triplet) {
    if (triplet.some( function(coords) {
        return (that.markerAtPlace(coords) === " ");
        })) {
      return;
    } else {
      var el1 = that.markerAtPlace(triplet[0]);
      var el2 = that.markerAtPlace(triplet[1]);
      var el3 = that.markerAtPlace(triplet[2]);
      if (el1 === el2 && el2 === el3) {
        isWon = el1;
      }
    }
  });
  return isWon;
};

module.exports = Board;

