var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[1,2],[],[]];
}

HanoiGame.prototype.isWon = function() {
  if(this.stacks[1].length == 2 || this.stacks[2].length == 2){
    return true;
  } else {
    return false;
  }
};

HanoiGame.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  if (this.stacks[startTowerIdx].length == 0) {
    return false;
  } else if (this.stacks[endTowerIdx].length == 0) {
    return true;
  } else if (this.stacks[endTowerIdx][0] < this.stacks[startTowerIdx][0]) {
    return false;
  } else {
    return true;
  }
};

HanoiGame.prototype.move = function(startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    this.stacks[endTowerIdx].unshift(this.stacks[startTowerIdx].shift());
  }
};

HanoiGame.prototype.print = function() {
  this.stacks.forEach(function (tower) {
    console.log(tower);
  });
};

HanoiGame.prototype.promptMove = function(callback) {
  var that = this;
  reader.question("Enter start tower: ", function (startTowerIdx) {
    var startTowerIdx = parseInt(startTowerIdx);
    reader.question("Enter end tower: ", function (endTowerIdx) {
      var endTowerIdx = parseInt(endTowerIdx);
      that.move(startTowerIdx, endTowerIdx);
      callback();
    });
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  this.print();
  var that = this;
  this.promptMove(function() {
    if (that.isWon()) {
      completionCallback();
    } else {
      that.run(completionCallback);
    }
  });
};

var a = new HanoiGame();

a.run(function () {
  console.log("Congratulations!");
  this.print;
  reader.close();
});
