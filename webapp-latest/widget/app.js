
var scotchApp = angular.module('scotchApp', ['ngRoute','ui.materialize','angular-loading-bar']);

    // configure our routes
    scotchApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/q/:qid/r/:rid/', {
                templateUrl : 'pages/view_answer.html',
                controller  : 'viewAnswerController'
            })
            .when('/q/:qid/r/', {
                templateUrl : 'pages/view_answers.html',
                controller  : 'viewAnswersController'
            })

            // route for the about page
            .when('/q/:qid/', {
                templateUrl : 'pages/answer.html',
                controller  : 'answerController'
            })
            .when('/thanks', {
                templateUrl : 'pages/thanks.html',
                controller: 'rootController'
            })
            .when('/', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController'
            })
            .when('/q/', {
                templateUrl : 'pages/questions.html',
                controller  : 'questionController'
            })

    });

var baseUrl = "https://api.locaholic.co"
    // create the controller and inject Angular's $scope
scotchApp.controller('viewAnswerController', ['$scope','$http','$routeParams', function($scope, $http,$routeParams){
    $scope.places = []
    $scope.getRecommendations = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/users/1/widget/questions/' + $routeParams.qid + '/recommendations/' + $routeParams.rid +'/'
      }).then(function successCallback(response) {
          console.log(response.data)
          $scope.$parent.user = response.data.created_by
          $scope.question = response.data.question
          response.data.collection.forEach(function(c){
            console.log(c)
            c.places.forEach(function(place){
              place.json = JSON.parse(place.json)
              console.log(place)
              $scope.places.push(place);
            })
          })
        }, function errorCallback(response) {
          $scope.$parent.showError(response.data)
        });
    }
    // $scope.getRecommendations();
    $scope.toggleFav = function ()
    {
      $scope.favColor = !$scope.favColor;
    }
    $scope.toggleLike = function ()
    {
      $scope.likeColor = !$scope.likeColor;
    }
  }]);

scotchApp.controller('viewAnswersController', ['$scope','$http','$routeParams', function($scope, $http,$routeParams){
    $scope.places = []
    $scope.getRecommendations = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/users/1/widget/questions/' + $routeParams.qid + '/recommendations/'
      }).then(function successCallback(response) {
          console.log(response.data)
          $scope.$parent.user = response.data.created_by
          $scope.question = response.data.question
          response.data.collection.forEach(function(c){
            console.log(c)
            c.places.forEach(function(place){
              place.json = JSON.parse(place.json)
              console.log(place)
              $scope.places.push(place);
            })
          })
        }, function errorCallback(response) {
          $scope.$parent.showError(response.data)
        });
    }
    // $scope.getRecommendations();
    $scope.toggleFav = function ()
    {
      $scope.favColor = !$scope.favColor;
    }
    $scope.toggleLike = function ()
    {
      $scope.likeColor = !$scope.likeColor;
    }
  }]);

scotchApp.controller('answerController', ['$scope','$http','$routeParams','$location', function($scope, $http,$routeParams, $location){
    $scope.makeTrue = function(){
      console.log("called")
        $scope.$parent.showInput = true;
    }
    $scope.gPlace;
    $scope.places=[];
    $scope.details = {};
    $scope.getQuestion = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/users/1/widget/questions/' + $routeParams.qid +'/'
      }).then(function successCallback(response) {
            console.log(response.data)
            $scope.$parent.user = response.data.created_by;
            $scope.question = response.data;
          }, function errorCallback(response) {
          $scope.$parent.showError(response.data)
        });// $scope.getRecommendations();
    }

    $scope.sendRecommendationLast = function(){
      $http({
        method: 'POST',
        data: {'email':$scope.email, 'is_public':true,'u_name':$scope.name, 'name':"default", 'collection':$scope.collection },
        url: baseUrl + '/users/1/widget/questions/' + $routeParams.qid + '/recommendations/'
      }).then(function successCallback(response) {
            console.log(response.data)
            $location.path('/thanks')
          }, function errorCallback(response) {
          $scope.$parent.showError(response.data)
        });
    }
    $scope.name =""
    $scope.email=""
    $scope.sendRecommendation = function(){
      for (i in $scope.places){
        $scope.places[i].name = $scope.places[i].formatted
        $scope.places[i].g_place_id = "lat/lng: ("+$scope.places[i].latitude+","+$scope.places[i].longitude+")"
        $scope.places[i].json = {}
        $scope.places[i].json['place_id'] = $scope.places[i].placeId
      }
      $http({
        method: 'POST',
        data: {'email':$scope.email,'u_name':$scope.name,'name':"default",'description':"Default", 'is_public':true, 'places':$scope.places },
        url: baseUrl + '/users/1/widget/collections/'
      }).then(function successCallback(response) {
            console.log(response.data)
            $scope.collection = [response.data.uuid];
            $scope.sendRecommendationLast();
          }, function errorCallback(response) {
          $scope.$parent.showError(response.data)
        });// $scope.getRecommendations();
    }
  }]);

scotchApp.directive('checkImage', function ($q) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            attrs.$observe('ngSrc', function (ngSrc) {
                var deferred = $q.defer();
                var image = new Image();
                image.onerror = function () {
                    deferred.resolve(false);
                    element.attr('src', element.attr('placeholder')); // set default image
                };
                image.onload = function () {
                    deferred.resolve(true);
                };
                image.src = ngSrc;
                return deferred.promise;
            });
        }
    };
});

    scotchApp.controller('rootController', function($scope,$sce) {
         $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };
        $scope.showInput=false;
        $scope.showMessage = function (result,status,xhr)
            {
              // $("#successModal").modal("show");
            }

          $scope.showError = function(data){
            console.log(data)
              try {
                    data = JSON.parse(data);
                    $.each(data, function(k, v) {
                    if(k!="places" && k!="asked_from"){
                    $scope.errorStr += '<p class="text-error h4"><b>'+k+" : " + v[0]+'</b></p>';
                    }
              });
                } catch(error) {
                  console.log(data)
                    $scope.errorStr = data    
                }        
              $scope.errorModalOpen=true;
            }
    });


scotchApp.directive('googleplace', function($http) {
     var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };
        var mapping = {
            street_number: 'number',
            route: 'street',
            locality: 'city',
            administrative_area_level_1: 'state',
            country: 'country',
            postal_code: 'zip'
        };
    return {
        require: 'ngModel',
        scope: {
                ngModel: '=',
                places: '=?',
                details: '=?',
            },
        link: function(scope, element, attrs, model) {
            var options = {
                types: []
            };
            var placesArray = scope.$eval(attrs.places);
            var details = scope.$eval(attrs.details);
            
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
            function cb(place,status){
                      if(place.hasOwnProperty('photos')){
                      details['photo'] = place.photos[0].getUrl({'maxWidth': 400, 'maxHeight': 400})
                      }
                      console.log(scope)
                      scope.$apply(function () {
                        placesArray.push(JSON.parse(JSON.stringify(details)));
                        console.log(scope.places)
                        model.$setViewValue(element.val());
                        }
                      );
                  }
            service = new google.maps.places.PlacesService(document.createElement('div'));
              google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    var place = scope.gPlace.getPlace();
                    details['latitude'] = place.geometry.location.lat()
                    details['longitude'] = place.geometry.location.lng()
                    // Get each component of the address from the place details
                    // and fill the corresponding field on the form.
                    for (var i = 0; i < place.address_components.length; i++) {
                        var addressType = place.address_components[i].types[0];
                        if (componentForm[addressType]) {
                            var val = place.address_components[i][componentForm[addressType]];
                            details[mapping[addressType]] = val;
                        }
                    }
                    details.formatted = place.formatted_address;
                    details.placeId = place.place_id;
                    console.log(details)
                    service.getDetails({placeId:place.place_id}, cb);
                  });
    }}});

scotchApp.filter('plusOrMinus', function(){
    return function(input){
        input = input ? input : 0
        return input > 0 ? "+"+input : 1.5
    }
})