(function() {
  var Util = Asteroids.Util = Asteroids.Util || {};
  
  Util.inherits = function (parentObj, childObj) {
    function Surrogate () {};
    Surrogate.prototype = parentObj.prototype;
    childObj.prototype = new Surrogate();
  }
})();