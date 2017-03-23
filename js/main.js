/**
 * Created by Mather on 2017-03-23.
 */

require.config({
    baseUrl: "js",
    paths: {
        "jquery": "lib/jquery",
        "underscore": "lib/underscore",
        "backbone": "lib/backbone",
        "util": "module/util"
    },
    waitSeconds: 15,
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }

});


requirejs(["util", "jquery", "underscore", "backbone"],
    function (util, $, _, Backbone) {
        console.log($("title").html());

    });