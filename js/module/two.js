var two = (function() {
  var two = {};
  var ModuleName = "Two";
  var color = "color:red";

  two.say = function() {
    console.log(this);
    console.log("%cthis is from %s Module, funciton say! ", color, ModuleName);
  };

  if (typeof define === "function" && define.amd) {
    define("two", ["jquery", "swal"], function($, _swal) {
      return two;
    });
  }
  return two;
})();


