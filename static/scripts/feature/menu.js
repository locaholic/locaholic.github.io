/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - Bootstrap <script src="static/vendor/bootstrap/dist/js/bootstrap.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - bootstrap
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        // Hide menu after click (on mobile devices)
        $('.navbar-collapse').on('click', '.nav a', function () {
            var $navBar = $(this).closest('.navbar-collapse');
            if ($navBar) {
                $navBar.collapse('hide')
            }
        });
    });
}));