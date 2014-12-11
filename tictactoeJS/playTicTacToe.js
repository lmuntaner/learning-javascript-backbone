var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var Index = require("./tictactoe/index");

var b = new Index.Board();
var g = new Index.Game(b, reader);

g.run(function (winner) {
  console.log("Congratulations! " + winner);
  this.board.print();
  reader.close();
});