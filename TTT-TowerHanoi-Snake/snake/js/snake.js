(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var Coord = Game.Coord = function(pos) {
    this.pos = pos;
  };

  Coord.prototype.plus = function(dir) {
    this.pos[0] += Coord.DIRS[dir][0];
    this.pos[1] += Coord.DIRS[dir][1];
  };

  Coord.prototype.minus = function(dir) {
    this.pos[0] -= Coord.DIRS[dir][0];
    this.pos[1] -= Coord.DIRS[dir][1];
  };

  Coord.DIRS = {
    "N" : [-1,0],
    "E" : [0,1],
    "S" : [1,0],
    "W" : [0,-1]
  };

  var Snake = Game.Snake = function () {
    this.dir = "N";
    this.segments = [new Coord([10,10])];
  };

  Snake.DIRS = ["N", "E", "S", "W"];

  Snake.prototype.move = function() {
    this.segments[0].plus(this.dir);
    for (var i = 1; i < this.segments.length; i++) {
      this.segments[i].pos = this.segments[i-1].pos;
    }
  };

  Snake.prototype.turn = function(dir) {
    if (this.dir === "N" || this.dir === "S") {
      if (dir === "W" || dir === "E") {
        this.dir = dir;
      }
    } else {
      if (dir === "N" || dir === "S") {
        this.dir = dir;
      }
    }
  };

  Snake.prototype.eatApple = function (coord) {
    this.segments.push(coord.minus());
  }

  var Board = Game.Board = function () {
    this.grid = [];
    this.dimX = 20;
    this.dimY = 20;
    this.setupGrid();
    this.snake = new Snake();
    this.apples = [new Coord([5,5])];
  };

  Board.prototype.setupGrid = function () {
    for (var i = 0; i < this.dimX; i++) {
      this.grid[i] = [];
      for (var j = 0; j < this.dimY; j++) {
        this.grid[i].push(".");
      }
    }
  };

  Board.prototype.generateApple = function () {
    var appleX = Math.floor(Math.random() * this.dimX);
    var appleY = Math.floor(Math.random() * this.dimY);
    var apple = new Coord([appleX, appleY]);
    this.apples.push(apple);
  }

  Board.prototype.hasApple = function (x, y) {
    var flagged = false;
    this.apples.forEach( function (coord) {
      if (coord.pos[0] === x && coord.pos[1] === y){
        flagged = true;
      }
    });
    return flagged;
  };

  Board.prototype.eatApple = function (){
    var lastItem = this.snake.segments.length - 1;
    var lastCoord = this.snake.segments[lastItem]
    if (this.hasApple(lastCoord.pos[0], lastCoord.pos[1])){
      this.snake.eatApple(lastCoord);
    }
  }

  Board.prototype.render = function() {
    for (var i = 0; i < this.dimX; i++) {
      this.grid[i] = [];
      for (var j = 0; j < this.dimY; j++) {
        if (this.snake.hasPos(i, j)){
          this.grid[i][j] = "S";
        }else if (this.hasApple(i, j)){
          this.grid[i][j] = "A";
        } else {
          this.grid[i][j] = ".";
        }
      }
    }
    this.grid.forEach(function(row) {
      console.log(row);
    })
  };

  Snake.prototype.hasPos = function (x, y) {
    var flagged = false;
    this.segments.forEach( function (coord) {
      if (coord.pos[0] === x && coord.pos[1] === y){
        flagged = true;
      }
    });
    return flagged;
  };

  Board.prototype.isNotValidPos = function(pos){
    return (pos[0] < 0 || pos[0] > this.dimX ||
      pos[1] < 0 || pos[1] > this.dimY)

  };

  Board.prototype.isFinished = function () {
    var gameOver = false;
    this.snake.segments.forEach( function (coord) {
      if (this.isNotValidPos(coord.pos)){
        gameOver = true;
      }
    }.bind(this));
    return gameOver;
  };

})();
