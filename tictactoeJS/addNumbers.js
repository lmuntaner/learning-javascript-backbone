function times (times, fn) {
  for (var i = 0; i < times; i++) {
    fn();
  }
}

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if(numsLeft > 0) {
    reader.question("Enter number: ", function (numString) {
      var num = parseInt(numString);
      sum += num;
      console.log("Sum: " + sum);
      var oneLessNum = numsLeft - 1;
      addNumbers(sum, oneLessNum, completionCallback);
    });
  } else {
    reader.close();
    completionCallback(sum);
  }
};




addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});
