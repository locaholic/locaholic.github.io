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
        templateUrl: 'views/welcome.html'
      })
      .when('/android', {
        templateUrl: 'views/android.html',
        controller: 'AndroidCtrl'
      })
      .when('/ios', {
        templateUrl: 'views/ios.html',
        controller: 'IosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });