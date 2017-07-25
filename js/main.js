/**
 * Created by Mather on 2017-03-23.
 */

require.config({
  baseUrl: "js",
  urlArgs: "v=" + new Date().getTime(),
  paths: {
    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone",
    swal: "lib/sweetalert2.min",
    util: "module/util",
    one: "module/one",
    two: "module/two"
  },
  waitSeconds: 15,
  shim: {
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    },
    swal: {
      deps: ["jquery"],
      exports: "_swal"
    }
  }
});

requirejs(
  ["util", "jquery", "underscore", "backbone", "one", "two", "swal"],
  function(util, $, _, Backbone, one, two, swal) {
    // util.hello();
    // util.readP();
    one.say();
    two.say();
    setTimeout(function() {
      one.saySwal();
    }, 1000);
  }
);
