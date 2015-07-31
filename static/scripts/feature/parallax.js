/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - JQuery Stellar <script src="static/vendor/jquery.stellar/jquery.stellar.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - jquery.stellar
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.stellar'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        $.stellar({
            horizontalScrolling: false
        });
    });
}));
