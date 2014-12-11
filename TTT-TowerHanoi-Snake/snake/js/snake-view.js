(function () {
  if (typeof Game === "undefined") {
    window.Game = {};
  }

  var View = Game.View = function ($el) {
    this.$el = $el;
    this.board = new Game.Board();
  };

  View.prototype.render = function() {
    var giantString = "";
    for (var i = 0; i < this.board.grid.length; i++){
      var row = "<div class='row'>";
      for (var j = 0; j < this.board.grid[i].length; j++){
        var classes;
        if (this.board.snake.hasPos(i, j)) {
          classes = "cell snake";
        } else if (this.board.hasApple(i, j)){
          classes = "cell apple"
        } else {
          classes = "cell"
        }
        var square = "<div class='" + classes + "' id='" + i + "-" + j + "'></div>";
        row += square;
      }
      row += "</div>";
      giantString += row;
    }

    this.$el.html(giantString);
  }

  View.prototype.play = function () {
    this.bindEvents();
    this.refreshId = setInterval(this.step.bind(this), 500);
  }

  View.prototype.step = function () {
    if (this.board.isFinished()) {
      this.render();
      var $finishBox = $('.game-over');
      $finishBox.html("<h2>Game Over!</h2>");
      clearInterval(this.refreshId);
    }
    this.board.snake.move();
    this.board.eatApple();
    this.render();
  }

  View.prototype.bindEvents = function () {
    var $snake;
    $('body').on("keydown", this.handleKeyEvent.bind(this));
  };


  View.prototype.handleKeyEvent = function (event) {
    this.DIRS = {
      37: "W",
      38: "N",
      39: "E",
      40: "S"
    };
    var dir = this.DIRS[event.keyCode];
    this.board.snake.turn(dir);
  };

})();
