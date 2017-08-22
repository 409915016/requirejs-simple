var general = (function general () {
  var general = {};
  general.hi = function (val) {
    console.log('Hello ' + val + a +' from general Module.' )
  }

  if (typeof define === 'function' && define.amd) {
    define('general', [], function() {
      return general;
    });
  }
  return general;
}());
