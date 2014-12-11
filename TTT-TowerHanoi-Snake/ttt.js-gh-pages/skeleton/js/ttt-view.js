(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.$el = $el;
    this.game = game;
  };

  View.prototype.bindEvents = function () {
    var $squares = this.$el.find(".cell");
    $squares.on("click", this.makeMove.bind(this));
  };

  View.prototype.makeMove = function (event) {
    var $square = $(event.currentTarget);
    var pos = $square.attr('id').split("-");
    try {
      this.game.playMove(pos);
    }
    catch(err) {
      alert("Invalid Move!");
    }
    if (this.game.currentPlayer === 'x'){
      $square.css("background", "blue")
    }else{
      $square.css("background", "pink")
    }
    if (this.game.isOver()) {
      if (this.game.winner()) {
        var winner = this.game.winner();
        if (winner === "o") {
          this.unbindEvents("Congratulations Blue won!");
        } else {
          this.unbindEvents("Congratulations Pink won!");
        }
      } else {
        this.unbindEvents("Game over. That's a TIE!")
      }
    }
  };

  View.prototype.unbindEvents = function (message) {
    var $squares = this.$el.find(".cell");
    $squares.off("click");
    var $winbox = $(".game-over");
    $winbox.html("<h1>" + message + "</h1>");
  }


  View.prototype.setupBoard = function () {
    var giantString = "";
    for (var i = 0; i < 3; i++) {
      var row = "<div class='row clearfix'>";
      for (var j = 0; j < 3; j++){
        var cell = "<div id='" + i + "-" + j + "' class='cell'></div>";
        row += cell;
      }
      row += "</div>";
      giantString += row;
    }
    this.$el.html(giantString);
  };
})();
