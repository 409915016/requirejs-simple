/**
 * Created by Administrator on 2017-05-23.
 */
(function () {
    window.two = this;
    this.hi = function (val) {
        console.log('hello ' + val + ' form two');
    }

    if (typeof define === "function" && define.amd) {
        define("two", [], function () {
            return two;
        })
    }
}());