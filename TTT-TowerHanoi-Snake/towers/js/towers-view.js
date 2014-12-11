(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.$el = $el;
    this.game = game;
    this.startTowerIdx = "";
  };

  View.prototype.bindEvents = function () {
    var $piles = this.$el.find(".pile");
    $piles.on("click", this.clickTower.bind(this));
  };


  View.prototype.play = function () {
    this.render();
    this.bindEvents();
  }


  View.prototype.render = function () {
    var giantString = "";
    for (var i = 0; i < this.game.towers.length; i++) {
      var pile = "<div id='" + i + "' class='pile'>";
      var discs = [];
      this.game.towers[i].forEach( function(disc) {
        var discStr = "<div class='disc' id='disc" + disc + "'></div>";
        discs.push(discStr)
      })
      pile += discs.reverse().join("");
      pile += "</div>";
      giantString += pile;
    }

    this.$el.html(giantString);
  };

  View.prototype.unbindEvents = function (message) {
    var $piles = this.$el.find(".pile");
    $piles.off("click");
    var $winbox = $(".game-over");
    $winbox.html("<h1>" + message + "</h1>");
  }

  View.prototype.clickTower = function (event){
    var endTowerIdx;
    if (this.startTowerIdx !== "") {
      endTowerIdx = $(event.currentTarget).attr('id');
    } else {
      this.startTowerIdx = $(event.currentTarget).attr('id');
    }
    if (endTowerIdx) {
      if (!this.game.move(this.startTowerIdx, endTowerIdx)) {
        alert("Invalid move!");
      }
      this.startTowerIdx = "";
      this.play();
    }
    if (this.game.isWon()) {
      this.unbindEvents("CONGRATULATIONS, you won!")
    }
  }
})();
