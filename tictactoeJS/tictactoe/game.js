var Board = require('./board');

function Game(board, reader) {
  this.board = board;
  this.gameReader = reader;
  this.currentMarker = "x";
}

Game.prototype.run = function(completionCallback) {
  this.board.print();
  var that = this
  this.askMove(function() {
    var winner = that.gameWinner();
    if (winner !== " ") {
      var completion = completionCallback.bind(that);
      completion(winner);
    } else {
      that.run(completionCallback);
    }
  });
};

Game.prototype.changeTurn = function() {
  if (this.currentMarker === "x") {
    this.currentMarker = "o";
  } else {
    this.currentMarker = "x";
  }
}

Game.prototype.gameWinner = function(board) {
  if (this.board.tied()) {
    return "on a fun game. You tied!";
  } else {
    return this.board.winner();
  }
};

Game.prototype.askMove = function(callback) {
  var that = this;
  // console.log(typeof(reader));
  that.gameReader.question("Enter row: ", function (row) {
    var row = parseInt(row);
    that.gameReader.question("Enter col: ", function (col) {
      var col = parseInt(col);
      if(that.board.placeMarker(row, col, that.currentMarker)) {
        that.changeTurn();
      }
      callback();
    });
  });
}

module.exports = Game;

