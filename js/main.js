/**
 * Created by Mather on 2017-03-23.
 */

require.config({
    baseUrl: "js",
    paths: {
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "util": "module/util",
        "two": "module/two"
    },
    waitSeconds: 15,
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        two: {
            deps: ['jquery'],
            exports: 'two'
        }
    }

});

requirejs(["util", "jquery", "underscore", "backbone", "two"],
    function (util, $, _, Backbone, two) {
        //util.hello();
        //util.readP();
        two.hi("world");
    });