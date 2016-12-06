'use strict';
angular.module('designTest')
  .controller('AndroidCtrl', function ($scope) {
    $scope.random = Math.floor(Math.random() *4 +1);

  });