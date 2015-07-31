/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - MouseWheel <script src="static/vendor/fancybox/lib/jquery.mousewheel-3.0.6.pack.js"></script>
 *      - Fancybox <script src="static/vendor/fancybox/source/jquery.fancybox.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - fancybox
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'fancybox'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        $('.js-feature-fancybox').fancybox({
            padding: 0,
            helpers: {
                overlay: {
                    locked: false
                }
            }
        });
    });
}));
