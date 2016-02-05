'use strict';
angular.module('myApp')
  .controller('mapCtrl',['$scope','uiGmapGoogleMapApi','$rootScope','$state',function ($scope,uiGmapGoogleMapApi,$rootScope,$state) {
  	uiGmapGoogleMapApi.then(function(maps) {
  	$scope.height=window.innerHeight +'px';
  	$scope.width=window.innerWidth +'px';
  	console.log($scope.height,$scope.width);
     $scope.lat = "0";
     $scope.lng = "0";
    $scope.map = {center: {latitude: 40, longitude:90}, zoom: 10 };
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
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    	} 
    else { 
        $scope.lat=40.1451;
    	$scope.lng=-99.6680;
      }


  $scope.logout= function(){
    console.log($rootScope.sessionUser);
    Parse.User.logOut()
    delete $rootScope.sessionUser;
    console.log($rootScope.sessionUser);
    $state.go('home.login');
  }
	function showPosition(position) {
	    $scope.lat= position.coords.latitude; 
	    $scope.lng= position.coords.longitude;	
		$scope.$apply();
		$scope.map.center={latitude:$scope.lat, longitude:$scope.lng};
		$scope.marker.coords={latitude:$scope.lat, longitude:$scope.lng};
		}
    		    	
        $scope.options = {
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
         });
        var events = {
          places_changed: function (searchBox) {
          	var place = searchBox.getPlaces();
        if (!place || place == 'undefined' || place.length == 0) {
            console.log('no place data :(');
            return;
        }
        	$scope.places=place;
          console.log(place);
        $scope.map = {
            "center": {
                "latitude": place[0].geometry.location.lat(),
                "longitude": place[0].geometry.location.lng()
            },
            "zoom": 18
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