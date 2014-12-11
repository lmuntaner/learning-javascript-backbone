(function() {
  var Asteroids = window.Asteroids = window.Asteroids || {};
  
  Asteroids.Asteroid = function(params) {
    this.COLOR = "red";
    this.RADIUS = 10;
    this.VEL = randomVel();
    
    
    var newParams = params;
    newParams.color = this.COLOR;
    newParams.radius = this.RADIUS;
    newParams.vel = this.VEL;
    Asteroids.MovingObject.call(this, newParams);
  };
  
  function randomVel() {
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    return [dx, dy];
  }
  
  Asteroids.Util.inherits(Asteroids.MovingObject, Asteroids.Asteroid);
})();

