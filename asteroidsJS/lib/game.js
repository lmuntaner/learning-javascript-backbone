(function () {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  
  Asteroids.Game = function() {
    
    this.DIM_X = 800;
    this.DIM_Y = 600;
    this.NUM_ASTEROIDS = 8;
    this.asteroids = [];
    this.bullets = [];
    for (var i = 0; i < this.NUM_ASTEROIDS; i++){
      this.asteroids.push(this.addAsteroids());
    }
    this.ship = new Asteroids.Ship({game: this});
    this.allObjectsArray = this.allObjects();
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