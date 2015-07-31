/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - Owl Carousel <script src="static/vendor/owl-carousel/owl-carousel/owl.carousel.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - owl-carousel
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'owl-carousel'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        var $carousel = $('.js-feature-carousel'),
            options = {
                autoPlay: true,
                stopOnHover: true
            };
        if ($carousel.length) {
            $carousel.owlCarousel($.extend(options, $carousel.data));
        }
    });
}));
