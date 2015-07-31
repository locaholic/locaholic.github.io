require.config({
    'baseUrl': 'static/scripts',
    'deps': ['bootstrap', 'retina'],
    'paths': {
        'jquery': '../vendor/jquery/dist/jquery',
        'bootstrap': '../vendor/bootstrap/dist/js/bootstrap',
        'fancybox': '../vendor/fancybox/source/jquery.fancybox',
        'jquery.fitvids': '../vendor/FitVids/jquery.fitvids',
        'jquery.validation': '../vendor/jquery.validation/dist/jquery.validate',
        'jquery.mousewheel': '../vendor/fancybox/lib/jquery.mousewheel-3.0.6.pack',
        'jquery.stellar': '../vendor/jquery.stellar/jquery.stellar',
        'owl-carousel': '../vendor/owl-carousel/owl-carousel/owl.carousel',
        'jquery.transit': '../vendor/jquery.transit/jquery.transit',
        'BigVideo': '../vendor/BigVideo.js/lib/bigvideo',
        'videojs': '../vendor/video.js/dist/video-js/video',
        'imagesloaded': '../vendor/imagesloaded/imagesloaded',
        'jquery-ui': '../vendor/jquery-ui/jquery-ui',
        'eventie': '../vendor/eventie',
        'eventEmitter': '../vendor/eventEmitter',
        'jparallax': '../vendor/jparallax/js/jquery.parallax',
        'retina': '../vendor/retina.js/dist/retina',
        'modernizr': '../vendor/modernizr/modernizr',
        'wow': '../vendor/WOW/dist/wow',
        'smooth.scroll': '../vendor/smooth.scroll/index'
    },
    'shim': {
        'bootstrap': ['jquery'],
        'jquery.fitvids': ['jquery'],
        'jquery.validation': ['jquery'],
        'jquery.mousewheel': ['jquery'],
        'jquery.stellar': {
            'deps': ['jquery'],
            'exports': 'jQuery.fn.parallax'
        },
        'jparallax': {
            'deps': ['jquery'],
            'exports': 'jQuery.fn.parallax'
        },
        'owl-carousel': {
            'deps': ['jquery'],
            'exports': 'jQuery.fn.owlCarousel'
        },
        'fancybox': ['jquery', 'jquery.mousewheel'],
        'retina': {
            'exports': 'window.Retina'
        },
        'modernizr': {
            'exports': 'window.Modernizr'
        },
        'wow': {
            'exports': 'window.WOW'
        }
    }
});
