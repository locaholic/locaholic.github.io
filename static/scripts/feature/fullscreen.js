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
        function expandSection() {
            var $sections = $('.landing-fullscreen'),
                windowHeight = $(window).height();

            $sections.each(function (i, item) {
                var $section = $(item),
                    contentHeight = getContentHeight($section),
                    paddingTop = 0,
                    originalPadding = $section.data('padding');

                if (originalPadding === undefined) {
                    originalPadding = parseInt($section.css('paddingTop'));
                    $section.data('padding', originalPadding);
                }

                if (windowHeight <= $section.height()) {
                    $section.css('paddingTop', originalPadding + 'px');
                    $section.height(contentHeight);
                } else {
                    // aligning content (middle)
                    paddingTop = (windowHeight - contentHeight) / 2;
                    $section.css('paddingTop', originalPadding + paddingTop + 'px');
                    $section.height(windowHeight - originalPadding - paddingTop);
                }
            });
        }

        function getContentHeight($section) {
            var height = 0;
            $section.find('> *').each(function () {
                height += $(this).height();
            });
            return height;
        }

        $(window)
            .off('resize.landingFullscreen')
            .on('resize.landingFullscreen', expandSection)
            .off('orientationchange.landingFullscreen')
            .on('orientationchange.landingFullscreen', expandSection);

        expandSection();
    });
}));