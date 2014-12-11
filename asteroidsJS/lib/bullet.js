(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  
  Asteroids.Bullet = function(params) {
    this.COLOR = "black";
    this.RADIUS = 5;    
    
    var newParams = params;
    newParams.color = this.COLOR;
    newParams.radius = this.RADIUS;
    newParams.vel[0] = params.vel[0] * 3;
    newParams.vel[1] = params.vel[1] * 3;
    Asteroids.MovingObject.call(this, newParams);
  };
  
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroids.Bullet);
})();