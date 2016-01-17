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
  .config(function ($routeProvider) {
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
      .otherwise({
        redirectTo: '/'
      });
  });