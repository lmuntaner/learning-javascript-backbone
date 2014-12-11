(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  (function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  
  Asteroids.Game = function() {
    
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 8;
    this.asteroids = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(this.addAsteroids());
    }
    this.ship = new Asteroids.Ship({game: this});
    this.allObjectsArray = this.allObjects();
    this.bullets = [];
  };
  
  Asteroids.Game.prototype.randomPosition = function() {
    var x = Math.random() * this.DIM_X;
    var y = Math.random() * this.DIM_Y;
    return [x, y];
  }
  
  Asteroids.Game.prototype.addAsteroids = function() {
    var params = { pos: this.randomPosition(), game: this }
    var asteroid = new Asteroids.Asteroid(params);
    return asteroid;
  }
  
  Asteroids.Game.prototype.draw = function(ctx) {
    ctx.clearRect(0,0,this.DIM_X, this.DIM_Y);
    this.allObjectsArray.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  }
  
  Asteroids.Game.prototype.moveObjects = function() {
    this.allObjectsArray.forEach(function(asteroid) {
      asteroid.move();
    });
  }
  
  Asteroids.Game.prototype.checkCollisions = function() {
    for(var i = 0; i < (this.allObjectsArray.length - 1); i++) {
      for (var j = i + 1; j < this.allObjectsArray.length; j++) {
        if (this.allObjectsArray[i].isCollidedWith(this.allObjectsArray[j])) {
          // this.remove(this.asteroids[j]);
          // this.remove(this.asteroids[i]);
          
          this.allObjectsArray[i].collideWith(this.allObjectsArray[j]);
        }
      }
    }
  }
  
  Asteroids.Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  }
  
  Asteroids.Game.prototype.remove = function(asteroid) {
    for (var i = 0; i < this.asteroids.length; i++) {
      if (asteroid === this.asteroids[i]) {
        this.asteroids.splice(i, 1);
      }
    }
  }
  
  Asteroids.Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  }
  
  Asteroids.Game.prototype.wrap = function(pos) {
    if (pos[0] > this.DIM_X) {
      pos[0] = pos[0] - this.DIM_X;
    } else if (pos[0] < 0) {
      pos[0] = pos[0] + this.DIM_X;
    }
    
    if (pos[1] > this.DIM_Y) {
      pos[1] = pos[1] - this.DIM_Y;
    } else if (pos[1] < 0) {
      pos[1] = pos[1] + this.DIM_Y;
    }
    
    
    // var newX = Math.abs(this.DIM_X % (pos[0] + this.DIM_X));
//     var newY = Math.abs(this.DIM_Y % (pos[1] + this.DIM_Y));
    return pos;
  }
})();
  Asteroids.Ship = function(params) {
    this.COLOR = "green";
    this.RADIUS = 20;
    this.VEL = [0, 0];
    
    
    var newParams = params;
    newParams.color = this.COLOR;
    newParams.radius = this.RADIUS;
    newParams.vel = this.VEL;
    newParams.pos = params.game.randomPosition();
    Asteroids.MovingObject.call(this, newParams);
  };
  
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroids.Ship);
  
  Asteroids.Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPosition();
  };
  
  Asteroids.Ship.prototype.power = function(impulse) {
    if (this.vel[0] + impulse[0] < 10 && this.vel[0] + impulse[0] > -10) {
      this.vel[0] += impulse[0];
    }
    if (this.vel[1] + impulse[1] < 10 && this.vel[1] + impulse[1] > -10) {
      this.vel[1] += impulse[1];
    }
  }
  
  Asteroids.Ship.prototype.fireBullet = function() {
    var params = {};
    params.game = this.game;
    params.pos = this.game.ship.pos;
    params.vel = this.game.ship.vel;
    this.game.bullets.push(new Asteroids.Bullet(params));
  }
  
})();