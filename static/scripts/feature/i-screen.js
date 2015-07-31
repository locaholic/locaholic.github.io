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
        $('.js-interactive-screen').each(function () {
            var $container = $(this),
                $screen = $container.find('.interactive-screen'),
                $items = $screen.find('.spec-icon-interactive'),
                $info = $container.find('.interactive-screen-info'),
                $specs = $info.find('.features-specification'),
                useAnimation = false,
                lastIcon;

            if ($(window).width() >= 992) {
                $specs
                    .css('opacity', 1)
                    .hide();
                bindEvent();
                useAnimation = true;
            }

            $(window).resize(function () {
                var width = $(this).width();
                if (width >= 992 && !useAnimation) {
                    useAnimation = true;
                    $specs
                        .css('opacity', 1)
                        .hide();
                    bindEvent();
                }
                if (width < 992 && useAnimation) {
                    useAnimation = false;
                    unbindEvent();
                    $specs
                        .css('opacity', 1)
                        .show();
                }
            });

            function unbindEvent() {
                $items.off('click.specIconInteractive');
            }

            function bindEvent() {
                unbindEvent();
                $items.on('click.specIconInteractive', '.spec-icon-interactive, .spec-icon', function () {
                    var $element = $(this),
                        $icon = $element.find('.fa').eq(0);
                    if ($icon) {
                        var classes = /(fa\-\S+)/.exec($icon.attr('class')),
                            icon = classes.length ? classes[0] : null;
                        if (icon && lastIcon != icon) {
                            var $visibleSpecs = $info.find('.features-specification:visible');
                            var $spec = $info.find('.features-specification').find('.' + icon).eq(0);
                            if ($spec) {
                                if (!$visibleSpecs.length) {
                                    $spec
                                        .closest('.features-specification')
                                        .show();
                                } else {
                                    $visibleSpecs.fadeOut(function () {
                                        setTimeout(function () {
                                            $spec
                                                .closest('.features-specification')
                                                .show();
                                        }, 200);
                                    });
                                }
                            }
                            lastIcon = icon;
                        }
                    }
                });
            }
        });
    });
}));
