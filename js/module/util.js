/**
 * Created by Mather on 2017-03-23.
 */

define(["jquery", "one", "two"], function($, one, two) {
  return {
    hello: function() {
      console.log("im from unit.js");
      console.log($);
    },
    readP: function() {
      alert($(".titie").text());
    },
    fromOne: function() {
      console.log(one);
      one.saySwal();

      setTimeout(function() {
        one.swal_old_say();
      }, 5000);
    }
  };
});
