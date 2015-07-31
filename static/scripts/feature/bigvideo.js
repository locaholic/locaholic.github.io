/**
 * Requirements:
 *      - JQuery <script src="static/vendor/jquery/dist/jquery.js"></script>
 *      - JQueryUI <script src="static/vendor/jquery-ui/jquery-ui.js"></script>
 *      - eventie <script src="static/vendor/eventie/eventie.js"></script>
 *      - EventEmitter <script src="static/vendor/eventEmitter/EventEmitter.js"></script>
 *      - ImagesLoaded <script src="static/vendor/imagesloaded/imagesloaded.js"></script>
 *      - video.js <script src="static/vendor/video.js/dist/video-js/video.js"></script>
 *      - BigVideo <script src="static/vendor/BigVideo.js/lib/bigvideo.js"></script>
 *      - Modernizr <script src="static/vendor/modernizr/modernizr.js"></script>
 *
 *   or if you using RequireJs (see static/scripts/config.js)
 *      - jquery
 *      - BigVideo
 */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'modernizr', 'BigVideo'], factory);
    } else {
        factory(root.$, root.Modernizr);
    }
}(this, function ($, Modernizr) {
    $(function () {
        var $body = $('body'),
            videos = [],
            videoMp4 = $body.attr('data-video-mp4'),
            videoWebm = $body.attr('data-video-webm'),
            videoOgg = $body.attr('data-video-ogg'),
            image = $body.attr('data-video-image');
        if (videoMp4) {
            videos.push({'type': 'video/mp4', 'src': videoMp4});
        }
        if (videoWebm) {
            videos.push({'type': 'video/webm', 'src': videoWebm});
        }
        if (videoOgg) {
            videos.push({'type': 'video/ogg', 'src': videoOgg});
        }
        if (videos.length) {
            var BV = new $.BigVideo();
            BV.init();
            if (Modernizr.touch && image) {
                BV.show(image);
            } else {
                BV.show(videos, {ambient: true});
            }
        }
    });
}));
