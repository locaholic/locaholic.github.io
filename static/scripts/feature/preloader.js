/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    var timer = setTimeout(showWarning, 10000);

//    $('html').css('overflow-y', 'hidden');
//    $('body').css('overflow-y', 'hidden');
    $(window).bind('load', closePreloader);
    $('.js-preloader-close').click(closePreloader);

    function showWarning() {
        $('.js-preloader-warning').show();
    }

    function closePreloader() {
        timer = null;
        $('.js-feature-preloader').fadeOut('slow', function () {
            $(this).remove();
            $('html').css('overflow-y', 'visible');
            $('body').css('overflow-y', 'visible');
        });
    }
}));
