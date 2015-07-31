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
    $(function () {
        $('.js-interactive-spec').each(function () {
            var $container = $(this),
                $feature = $container.find('.features-specification'),
                $interactive = $container.find('.spec-icon-interactive'),
                nowSelected = false,
                timer = null;

            $feature.mouseenter(function (e) {
                eventManager(function () {
                    var $element = $(e.currentTarget),
                        $icon = $element.find('.fa').eq(0);
                    if ($icon) {
                        var classes = /(fa\-\S+)/.exec($icon.attr('class')),
                            icon = classes.length ? classes[0] : null;
                        var $spec = $interactive.find('.' + icon).eq(0);
                        if ($spec) {
                            var $target = $spec.closest('.spec-icon-interactive'),
                                $container = $target.parent();
                            if (nowSelected) {
                                $container
                                    .find('.js-feature-icon-current')
                                    .removeClass('js-feature-icon-current spec-icon-interactive-animation-go')
                                    .fadeOut();
                            }
                            $target.addClass('js-feature-icon-current');
                            $container
                                .find('.spec-icon-interactive')
                                .filter(function () {
                                    return !$(this).hasClass('js-feature-icon-current');
                                })
                                .fadeOut(function () {
                                    $target.fadeIn(function () {
                                        $(this).addClass('spec-icon-interactive-animation-go');
                                    });
                                });
                            nowSelected = true;
                        }
                    }
                }, 100);
            });

            $feature.mouseleave(function (e) {
                eventManager(function () {
                    var $element = $(e.currentTarget),
                        $icon = $element.find('.fa').eq(0);
                    if ($icon) {
                        var classes = /(fa\-\S+)/.exec($icon.attr('class')),
                            icon = classes.length ? classes[0] : null;
                        var $spec = $interactive.find('.' + icon).eq(0);
                        if ($spec) {
                            var $target = $spec.closest('.spec-icon-interactive'),
                                $container = $target.parent();
                            $container.find('.spec-icon-interactive')
                                .removeClass('js-feature-icon-current spec-icon-interactive-animation-go')
                                .fadeIn();
                            nowSelected = false;
                        }
                    }
                }, 500);
            });


            function eventManager(func, timeout) {
                clearTimeout(timer);
                timer = setTimeout(func, timeout);
            }
        });
    });
}));
