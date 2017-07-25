define(["jquery", "swal"], function($, _swal) {
  return {
    say: function() {
      alert($("body").css("color"));
      console.log("this is from one Module, funciton say!");
    },
    saySwal: function() {
      _swal("Any fool can use a computer");
    }
  };
});
