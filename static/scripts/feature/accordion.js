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
        function recalculateAccordionInterval() {
            var $accordions = $('.device-accordion.js-device-accordion');

            $accordions.each(function () {
                var $accordion = $(this),
                    $devices = $accordion.find('> div'),
                    accordionSize = {
                        'width': $accordion.width(),
                        'height': $accordion.height()
                    },
                    percentOverflow = 60,
                    maxPercentOverflow = 90,
                    devicesSize = {};

                do {
                    devicesSize = calculateDevicesSize($devices, percentOverflow, maxPercentOverflow);
                    if (accordionSize.width <= devicesSize.min) {
                        percentOverflow = maxPercentOverflow;
                        devicesSize.max = devicesSize.min;
                        accordionSize.width = devicesSize.min;
                    }
                    if (accordionSize.width >= devicesSize.max) {
                        var height = 0;
                        var position = (accordionSize.width / 2 - Math.ceil(devicesSize.max / 2));
                        $devices.each(function () {
                            var $item = $(this);
                            $item.css('left', position + 'px');
                            position += $item.width() / 100 * (100 - percentOverflow);
                            if (height < $item.height()) {
                                height = $item.height();
                            }
                        });
                        $accordion.css('height', height + 'px');
                        break;
                    }
                    percentOverflow += 5;
                } while (percentOverflow < maxPercentOverflow);
            });
        }

        function calculateDevicesSize($devices, percentOverflow, maxPercentOverflow) {
            var result = {'min': 0, 'max': 0};
            $devices.each(function (i, item) {
                var $item = $(item),
                    width = $item.width();
                result.max = !i ? width : result.max + width / 100 * (100 - percentOverflow);
                result.min = !i ? width : result.min + width / 100 * (100 - maxPercentOverflow);
            });
            return result;
        }

        if ($('.js-device-accordion').length > 0) {
            $(window).resize(recalculateAccordionInterval);
            recalculateAccordionInterval();
        }
    });
}));
