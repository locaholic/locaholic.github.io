/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - JQuery Transit <script src="static/vendor/jquery.transit/jquery.transit.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - jquery.transit
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'jquery.transit'], factory);
    } else {
        factory(root.$);
    }
}(this, function ($) {
    $(function () {
        var canUseAnimation = true,
            timer,
            windowWidth = $(window).width();

        $(window).resize(function () {
            windowWidth = $(this).width();
        });


        $('.cover-ia-left')
            .mouseenter(function () {
                if (windowWidth >= 768) {
                    eventManager(500, startLeftAnimation);
                }
            })
            .mouseleave(function () {
                if (windowWidth >= 768) {
                    eventManager(300, stopLeftAnimation);
                }
            });

        $('.cover-ia-right')
            .mouseenter(function () {
                if (windowWidth >= 768) {
                    eventManager(500, startRightAnimation);
                }
            })
            .mouseleave(function () {
                if (windowWidth >= 768) {
                    eventManager(300, stopRightAnimation);
                }
            });

        function showStatic() {
            $('.cover-interactive-wrapper').find('.static-item').fadeIn();
        }

        function hideStatic() {
            $('.cover-interactive-wrapper').find('.static-item').fadeOut();
        }

        function startLeftAnimation() {
            var $left = $('.cover-ia-left').find('.move-item'),
                $center = $('.cover-ia-center').find('.move-item'),
                $right = $('.cover-ia-right').find('.move-item');

            hideStatic();
            $center.transition({
                'left': '50%',
                'opacity': 1
            });
            $left
                .css('display', 'table')
                .transition({
                    'opacity': 1,
                    'left': 0
                });
            $right
                .transition({'opacity': 0}, function () {
                    $(this)
                        .css('right', '50%')
                        .css('display', 'none');
                });
        }

        function startRightAnimation() {
            var $left = $('.cover-ia-left').find('.move-item'),
                $center = $('.cover-ia-center').find('.move-item'),
                $right = $('.cover-ia-right').find('.move-item');

            hideStatic();
            $center.transition({
                'left': '-50%'
            });
            $right
                .css('display', 'table')
                .transition({
                    'right': 0,
                    'opacity': 1
                });
            $left
                .transition({'opacity': 0}, function () {
                    $(this)
                        .css('left', '50%')
                        .css('display', 'none');
                });
        }

        function stopLeftAnimation() {
            var $left = $('.cover-ia-left').find('.move-item'),
                $center = $('.cover-ia-center').find('.move-item'),
                $right = $('.cover-ia-right').find('.move-item');

            $center.transition({
                'left': 0
            });
            $left.transition({
                'opacity': 0,
                'left': '50%'
            }, function () {
                showStatic();
                $left.css('display', 'none');
            });
            $right.hide();
        }

        function stopRightAnimation() {
            var $left = $('.cover-ia-left').find('.move-item'),
                $center = $('.cover-ia-center').find('.move-item'),
                $right = $('.cover-ia-right').find('.move-item');

            $center.transition({
                'left': 0
            });
            $right.transition({
                'right': '50%',
                'opacity': 0
            }, function () {
                showStatic();
                $right.css('display', 'none');
            });
            $left.hide();
        }

        function eventManager(timeout, func) {
            clearTimeout(timer);
            timer = setTimeout(func, timeout);
        }
    });
}));