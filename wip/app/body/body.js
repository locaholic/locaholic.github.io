
angular.module('myApp')
.controller('mapCtrl',['$scope','uiGmapGoogleMapApi','$rootScope','$state',function ($scope,uiGmapGoogleMapApi,$rootScope,$state) {
    $scope.lat = "0";
    $scope.lng = "0";
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 40,
            longitude: 90
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "You are here!",
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };
  $scope.showPosition=function (position) {
      $scope.lat= position.coords.latitude; 
      $scope.lng= position.coords.longitude;  
    $scope.$apply();
    $scope.map.center={latitude:$scope.lat, longitude:$scope.lng};
    $scope.marker.coords={latitude:$scope.lat, longitude:$scope.lng};
    }
    uiGmapGoogleMapApi.then(function(maps) {
    $scope.map = {center: {latitude: 40, longitude:90}, zoom: 10,control:{}};
    $scope.options = {
            autocomplete:true,
            scrollwheel: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_RIGHT
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        };
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition($scope.showPosition);
      } 
    else { 
        $scope.lat=40.1451;
      $scope.lng=-99.6680;
      }


              
    });
        var events = {
          places_changed: function (searchBox) {
            var place = searchBox.getPlaces();
            $state.go("home.places");
        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data :(');
            return;
        }
          $scope.places=place;
          $scope.getUrl=function(photo){
            return photo.getUrl({'maxWidth': 600, 'maxHeight': 300});
          };
        $scope.map = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 10
        };
        $scope.marker = {
            id: 0,
            coords: {
                latitude: place[0].geometry.location.lat(),
                longitude: place[0].geometry.location.lng()
            }
        };
          }
        };
        $scope.searchbox = { template:'searchbox.tpl.html', events:events};


  }]);