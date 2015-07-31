/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - JQuery FitVids <script src="static/vendor/FitVids/jquery.fitvids.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - jquery.fitvids
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.fitvids'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        $('.js-feature-video').fitVids();
    });
}));
