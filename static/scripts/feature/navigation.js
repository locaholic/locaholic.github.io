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
        function init() {
            bindScroll();
            bindBlur();
        }

        function bindScroll() {
            $('.js-feature-scroll').on('click', function (event) {
                var $window = $(window),
                    $document = $(document);
                event.preventDefault();
                var DURATION = 1000,
                    $container = $(this.hash),
                    destination = 0;
                if ($container.offset().top > $document.height() - $window.height()) {
                    destination = $document.height() - $window.height();
                } else {
                    destination = $container.offset().top;
                }
                $('html, body').animate({scrollTop: destination}, DURATION, 'swing');
            });
        }

        function bindBlur() {
            var nowScrolling = false,
                $navbar = $('.navbar'),
                navbarHeight = $navbar.height();
            $(document).on('scroll', function () {
                if (!nowScrolling) {
                    nowScrolling = true;
                    setTimeout(function () {
                        var offset = window.pageYOffset || $(this).scrollTop();
                        if (offset >= navbarHeight) {
                            if ($navbar.hasClass('navbar-transparent')) {
                                $navbar
                                    .removeClass('navbar-transparent')
                                    .addClass('navbar-transparent-additional');
                            }
                        } else {
                            if ($navbar.hasClass('navbar-transparent-additional')) {
                                $navbar
                                    .removeClass('navbar-transparent-additional')
                                    .addClass('navbar-transparent');
                            }
                        }
                        nowScrolling = false;
                    }, 250);
                }
            });
        }

        init();
    });
}));
