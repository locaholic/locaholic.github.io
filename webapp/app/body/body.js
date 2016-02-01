'use strict';
angular.module('myApp')
  .controller('mapCtrl',['$scope',function ($scope) {
  	$scope.height=window.innerHeight +'px';
  	$scope.width=window.innerWidth +'px';
  	console.log($scope.height,$scope.width);
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

  }]);