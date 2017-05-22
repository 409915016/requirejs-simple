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
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }

});

requirejs(["util", "jquery", "underscore", "backbone"],
    function (util, $, _, Backbone) {
        util.hello();
        util.readP();
    });