var app = angular.module('locaholic', ['ui.router', 'satellizer', 'toastr', 'ngMessages']);
var baseUrl = "https://api.locaholic.co";
app.run(function ($rootScope, $state, $auth) {
  $rootScope.$on('$stateChangeStart',
    function (event, toState) {
      var requiredLogin = false;
      if (toState.data && toState.data.requiredLogin)
        requiredLogin = true;

      if (requiredLogin && !$auth.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
    });
});

app.directive('checkImage', function ($q) {
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

app.directive('question', function() {
   var directive = {};
   directive.restrict = 'E';
   directive.templateUrl = "directive_partials/question.tpl.html";
   directive.scope = {
      question : "=data"
   }
   return directive;
});

app.directive('googleplace', function($http) {
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
                    // scope.gPlace.text = "";
                    service.getDetails({placeId:place.place_id}, cb);
                  });
    }}});

app.filter('plusOrMinus', function(){
    return function(input){
        input = input ? input : 0
        return input > 0 ? "+"+input : 1.5
    }
})


app.controller('AskController', ['$scope', '$http', '$stateParams', function ($scope, $http, $stateParams){
  $scope.askQuestion = function(){
    console.log("Ask Question called");
  }
  $scope.getPendingQuestions = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/users/1/questions/?asked=true'
      }).then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          alert(JSON.stringify(response))
        });
    }
}]);

app.controller('LoginSignupCtrl', function ($scope, $auth, $state, toastr) {

  $scope.signUp = function () {
    $auth
      .signup({email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('secret');
      })
      .catch(function (response) {
        toastr.error(
          'Error!',
          {closeButton: true}
        );
      })
  };

  $scope.login = function () {
    $auth
      .login({email: $scope.email, password: $scope.password})
      .then(function (response) {
        $auth.setToken(response);
        $state.go('secret');
      })
      .catch(function (response) {
        toastr.error(
          'Email or password not correct!',
          {closeButton: true}
        );
      })
  };

  $scope.auth = function (provider) {
    $auth.authenticate(provider)
      .then(function (response) {
        $state.go('ask');
      })
      .catch(function (response) {
        console.debug("catch", response);
      })
  }
});




app.controller('cardController', ['$scope','$http','$stateParams',function($scope, $http, $stateParams){
    var baseUrl = "http://localhost:8000"
    $scope.places = [];
    $scope.getRecommendations = function(){
      $http({
        method: 'GET',
        url: baseUrl + '/users/1/widget/questions/' + $stateParams.qid + '/recommendations/' + $stateParams.rid +'/'
      }).then(function successCallback(response) {
          $scope.places = response.data.collections.forEach(function(collection){
            $scope.places.push.apply($scope.places, collection.places);
          })
        }, function errorCallback(response) {
          alert(JSON.stringify(response))
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

app.controller('RecommendationController', ['$scope','$http','$stateParams',function($scope, $http, $stateParams){
    // var baseUrl = "http://localhost:8000"
    // $scope.places = [];
    // $scope.getRecommendations = function(){
    //   $http({
    //     method: 'GET',
    //     url: baseUrl + '/users/1/widget/questions/' + $stateParams.qid + '/recommendations/' + $stateParams.rid +'/'
    //   }).then(function successCallback(response) {
    //       $scope.places = response.data.collections.forEach(function(collection){
    //         $scope.places.push.apply($scope.places, collection.places);
    //       })
    //     }, function errorCallback(response) {
    //       alert(JSON.stringify(response))
    //     });
    // }
    // // $scope.getRecommendations();
    // $scope.toggleFav = function ()
    // {
    //   $scope.favColor = !$scope.favColor;
    // }
    // $scope.toggleLike = function ()
    // {
    //   $scope.likeColor = !$scope.likeColor;
    // }
    $scope.askQuestion = function(){
      console.log("Ask Question called");
    }

    $scope.getQuestion = function(){
      if($scope.requests && !$scope.current_ques){
        angular.forEach($scope.requests, function(question){
          if(question.ques.uuid == $stateParams.qid){
            $scope.current_ques = question
          }
        })
      }
      if($scope.public && !$scope.current_ques){
        angular.forEach($scope.requests, function(question){
          if(question.ques.uuid == $routeParams.qid){
            $scope.current_ques = question
          }
        })
      }
      if(!$scope.current_ques){
        $scope.current_ques = getQuestionFromServer($http, $stateParams.qid)
      }
    }
    $scope.getPendingQuestions = function(){
        $http({
          method: 'GET',
          url: baseUrl + '/users/1/questions/?asked=true'
        }).then(function successCallback(response) {
            $scope.requests = response.data.requests
            $scope.public = response.data.public
            console.log(response)
          }, function errorCallback(response) {
            alert(JSON.stringify(response))
          });
      }
  }]);

var getQuestionFromServer = function(http, ques_uuid){
        console.log("getQuestionFromServer")
        http({
        method: 'GET',
          url: baseUrl + '/users/1/questions/' + ques_uuid +'/'
        }).then(function successCallback(response) {
              return response.data
            }, function errorCallback(response) {
            console.log(response.data)
        });
      }

app.config(['$stateProvider', '$urlRouterProvider', '$authProvider', '$httpProvider',function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider) {

  $stateProvider
    .state('user', {
      url: '/user',
      templateUrl: 'partials/user.tpl.html',
      data: {requiredLogin: true}
    })
    .state('ask', {
      url: '/ask',
      templateUrl: 'partials/ask.tpl.html',
      data: {requiredLogin: true},
      controller: 'AskController'
    })
    .state('recommend_post', {
      url: '/q/:qid/r/',
      templateUrl: 'partials/recommend_post.tpl.html',
      data: {requiredLogin: true},
      controller: 'RecommendationController'
    })
    .state('recommend', {
      url: '/q/',
      templateUrl: 'partials/recommend.tpl.html',
      data: {requiredLogin: true},
      controller: 'RecommendationController'
    })
    .state('recommend.browse', {
      url: '/q/:qid/r/:rid/',
      templateUrl: 'partials/recommend_browse.tpl.html',
      data: {requiredLogin: true}
    })
    // .state('recommend.browse.collection', {
    //   url: '/recommend/:r_id/col',
    //   templateUrl: 'partials/collection.tpl.html',
    //   // data: {requiredLogin: true}
    // })
    // .state('secret', {
    //   url: '/secret',
    //   templateUrl: 'partials/secret.tpl.html',
    //   controller: 'SecretCtrl',
      
    // })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.tpl.html',
      controller: 'LoginSignupCtrl'
    });

  $urlRouterProvider.otherwise('/user');
  
  $httpProvider.interceptors.push(['$q', '$window', function($q,$window) {
    return {
     'request': function(config) {
          config.headers['Authorization'] = "Bearer " + $window.localStorage['satellizer_token'];
          return config;
      }
    };
  }]);
  
  $authProvider.facebook({
    url: 'https://api.locaholic.co/auth/facebook/?platform=web',
    clientId: '971388552927772',
    // by default, the redirect URI is http://localhost:5000
    redirectUri: location.origin + location.pathname,
    platform: 'web'
    // redirectUri: ''
  });

}]);

