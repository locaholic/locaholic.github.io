var app = angular.module('locaholic', ['ui.router', 'satellizer', 'toastr', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']);
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
    .state('recommend', {
      url: '/q/:qid/r/',
      templateUrl: 'partials/recommend_post.tpl.html',
      data: {requiredLogin: true}
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

