(function(rootObject) {
  var Asteroids = rootObject.Asteroids = rootObject.Asteroids || {};
  
  Asteroids.MovingObject = function (params) {
    
    this.pos = params.pos;
    this.vel = params.vel;
    this.radius = params.radius;
    this.color = params.color;
    this.game = params.game;
  }
  
  Asteroids.MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }
  
  Asteroids.MovingObject.prototype.move = function () {
    this.pos = this.game.wrap(this.pos);
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
  
  Asteroids.MovingObject.prototype.isCollidedWith = function (otherObj) {
    var disX = Math.abs(this.pos[0] - otherObj.pos[0]);
    var disY = Math.abs(this.pos[1] - otherObj.pos[1]);
    var sumOfRadius = this.radius + otherObj.radius;
    var dist = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
    return (dist <= sumOfRadius);
  }
  
  Asteroids.MovingObject.prototype.collideWith = function (otherObj) {
    if (otherObj instanceof Asteroids.Ship) {
      otherObj.relocate();
      this.game.remove(this);
    }
  }
  
})(this);

