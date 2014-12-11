function Clock () {
  this.currentTime;
}

Clock.TICK = 5000;

Clock.prototype.printTime = function (date) {
  var seconds = date.getSeconds();
  var minutes = date.getMinutes();
  var hours = date.getHours();
  var string_time = hours + ":" + minutes + ":" + seconds;
  console.log(string_time);
};

Clock.prototype.run = function () {
  
  // 1. Set the currentTime.
  // 2. Call printTime.
  // 3. Schedule the tick interval.
  this.currentTime = new Date();
  this.printTime(this.currentTime);
  setInterval(this._tick.bind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  
  // 1. Increment the currentTime.
  // 2. Call printTime.
  var newTime = this.currentTime.getTime() + Clock.TICK;
  this.currentTime.setTime(newTime)
  this.printTime(this.currentTime);
};

clock = new Clock();
clock.run();