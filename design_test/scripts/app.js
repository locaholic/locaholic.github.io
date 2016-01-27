'use strict';

/**
 * @ngdoc overview
 * @name pooApp
 * @description
 * # pooApp
 *
 * Main module of the application.
 */
var app=angular
  .module('designTest', [
    'ngRoute',
    'ngFitText'
  ])
  .config(function ($routeProvider,$sceProvider) {
   
    $sceProvider.enabled(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/platform.html'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeCtrl'
      })
      .when('/placesmap', {
        templateUrl: 'views/placesmap.html',
        controller: 'placesmapCtrl'
      })
      .when('/placeslist', {
        templateUrl: 'views/placeslist.html',
        controller: 'placeslistCtrl'
      })
      .when('/placesdetail', {
        templateUrl: 'views/placesdetail.html',
        controller: 'placedetailCtrl'
      })
      .when('/recommend', {
        templateUrl: 'views/recommend.html',
        controller: 'recommendCtrl'
      })
      .when('/ask', {
        templateUrl: 'views/ask.html',
        controller: 'askCtrl'
      })
      .when('/tip', {
        templateUrl: 'views/tip.html',
        controller: 'tipCtrl'
      })
      .when('/thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'thanksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      })
  });
app.run(function($rootScope) {
 
     Parse.initialize("7YyZO6oZNVongKR6pluyULEkMEmvLVRtVZvd6OXn", "JTOrsTnWqTBhxqxFMEvPdOUzDd9Ro01JqpiAF003");
 
    $rootScope.sessionUser = Parse.User.current();
    Parse.FacebookUtils.init({
      appId: '971388552927772',
      channelUrl : 'views/channel.html',
      cookie: true,
      version: 'v2.5',
      xfbml: true
    });
     window.onhashchange=function(){ mouseflow.newPageView(document.location.pathname + document.location.hash); };  var _mfq = _mfq || [];
  (function() {
    var mf = document.createElement("script");
    mf.type = "text/javascript"; mf.async = true;
    mf.src = "//cdn.mouseflow.com/projects/43558e67-da68-4e1f-81f0-23ecdaf10173.js";
    document.getElementsByTagName("head")[0].appendChild(mf);
  })();  
  });




