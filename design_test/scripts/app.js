'use strict';

/**
 * @ngdoc overview
 * @name pooApp
 * @description
 * # pooApp
 *
 * Main module of the application.
 */
angular
  .module('designTest', [
    'ngRoute'
  ])
  .config(function ($routeProvider,$sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider
      .when('/?screen="platform"', {
        templateUrl: 'views/platform.html'
      })
      .when('/login?screen="login"', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/welcome?screen="welcome"', {
        templateUrl: 'views/welcome.html',
        controller: 'welcomeCtrl'
      })
      .when('/placesmap?screen="placesmap"', {
        templateUrl: 'views/placesmap.html',
        controller: 'placesmapCtrl'
      })
      .when('/placeslist?screen="placeslist"', {
        templateUrl: 'views/placeslist.html',
        controller: 'placeslistCtrl'
      })
      .when('/placesdetail?screen="placesdetail"', {
        templateUrl: 'views/placesdetail.html',
        controller: 'placedetailCtrl'
      })
      .when('/recommend?screen="recommend"', {
        templateUrl: 'views/recommend.html',
        controller: 'recommendCtrl'
      })
      .when('/ask?screen="ask"', {
        templateUrl: 'views/ask.html',
        controller: 'askCtrl'
      })
      .when('/tip?screen="tip"', {
        templateUrl: 'views/tip.html',
        controller: 'tipCtrl'
      })
      .when('/thanks?screen=thanks', {
        templateUrl: 'views/thanks.html',
        controller: 'thanksCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });