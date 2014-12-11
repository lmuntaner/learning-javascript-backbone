(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  
  Asteroids.GameView = function () {
    this.game = new Asteroids.Game();
    this.ctx = null;
  }
  
  Asteroids.GameView.prototype.bindKeyHandlers = function () {
    key("right", function() {
      this.game.ship.power([1,0])
    }.bind(this));
    key("left", function() {
      this.game.ship.power([-1,0])
    }.bind(this));
    key("up", function() {
      this.game.ship.power([0,-1])
    }.bind(this));
    key("down", function() {
      this.game.ship.power([0,1])
    }.bind(this));
    key("space", this.game.ship.fireBullet.bind(this));
  }
  
  Asteroids.GameView.prototype.start = function () {
    this.bindKeyHandlers();
    window.setInterval(function () {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 20);
  }
  
})();