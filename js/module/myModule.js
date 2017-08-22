define(["jquery"], function($) {
  var a = 1;
  var b = 2;
  var foo = function() {
    console.log(a);
    console.log($);
  };
  var bar = function() {
    console.log(b);
  };
  return {
    foo: foo,
    bar: bar
  };
});
