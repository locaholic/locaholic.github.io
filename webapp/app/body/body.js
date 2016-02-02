'use strict';
angular.module('myApp')
  .controller('mapCtrl',['$scope',function ($scope) {
  	$scope.height=window.innerHeight +'px';
  	$scope.width=window.innerWidth +'px';
  	console.log($scope.height,$scope.width);
    $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 8 };
        $scope.options = {
        					scrollwheel: true,
 							mapTypeControl: true,
						   	zoomControl: true,
						    scaleControl: true,
						    streetViewControl: true
						};
        var events = {
          places_changed: function (searchBox) {}
        }
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};
  }]);