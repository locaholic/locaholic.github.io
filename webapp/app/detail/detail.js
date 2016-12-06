
angular.module('myApp')
.controller('placeDetailCtrl',['$scope','$stateParams','uiGmapIsReady',function ($scope,$stateParams,uiGmapIsReady) {
    
    $scope.placeDetail=function(){
                        var request={placeId: $stateParams.placeId};
                        uiGmapIsReady.promise().then(function (map_instances) {
                        var map2 = map_instances[0].map;            // get map object through array object returned by uiGmapIsReady promise
                        $scope.detailService = new google.maps.places.PlacesService(map2);
                        $scope.detailService.getDetails(request, callback);
                        });
                        }   

    function callback(place, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        position={coords: {
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            }};
        $scope.showPosition(position);
        $scope.currentPlace=place;
      }
    }
    
  }]);