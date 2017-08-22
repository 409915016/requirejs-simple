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
    swal2: "lib/sweetalert2.min",
    swal: "lib/sweetalert.min",
    util: "module/util",
    one: "module/one",
    two: "module/two",
    myModule: "module/myModule",
    general: "module/general"
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
    swal2: {
      deps: ["jquery"]
    },
    swal: {
      deps: ["jquery"]
    }
  }
});

requirejs(
  ["util", "jquery", "underscore", "backbone", "one", "two", "myModule", "swal", "general"],
  function(util, $, _, Backbone, one, two, myModule, swal, general) {
    //util.fromOne();
    //util.hello();
    // util.readP();
    // one.say();
    //two.say();
    // setTimeout(function() {
    //   util.fromOne();
    // }, 5000);
    //one.saySwal();
    //one.swal_old_say();
    //myModule.foo();
    general.hi("World");
  }
);
