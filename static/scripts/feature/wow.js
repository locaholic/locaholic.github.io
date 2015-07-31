/**
 * Requirements:
 *      - JQuery <script src="static/vendor/WOW/dist/wow.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - wow
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['wow'], factory);
    } else {
        factory(root.WOW);
    }
}(this, function (WOW) {
    new WOW({
        'offset': 200,
        'mobile': false
    }).init();
}));