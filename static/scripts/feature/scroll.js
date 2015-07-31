/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - Smooth Scroll <script src="static/vendor/smooth.scroll/index.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - smooth.scroll
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'smooth.scroll'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
}));