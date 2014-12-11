Function.prototype.myBind = function(obj) {
  var fn = this;
  return function() {
    fn.apply(obj);
  }
}

var bark = function() {
  console.log(this.name + " says Woof");
};

var Dog = function(name) {
  this.name = name;
};

var dog = new Dog("Llorenc");
var a = bark.myBind(dog);

var b = bark;
a()
b()