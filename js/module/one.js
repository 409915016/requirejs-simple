define(["jquery", "swal2", "swal"], function($, swal2, swal) {
  return {
    say: function() {
      alert($("body").css("color"));
      console.log("this is from one Module, funciton say!");
    },
    saySwal: function() {
      swal2("Hello! from one.saySwal2");
    },
    swal_old_say: function() {
      swal("Hello! from one.swal_old_say");
    }
  };
});
