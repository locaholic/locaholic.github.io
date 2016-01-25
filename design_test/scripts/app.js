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
   
  });




