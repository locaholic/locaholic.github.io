'use strict';
angular.module('myApp')
.controller('loginCtrl',['$scope','$state','$rootScope',function($scope,$state,$rootScope) {
  $scope.login=function() {
    console.log($state.$current.name);
  Parse.FacebookUtils.logIn('email', {
                                      success: loginSuccessful,
                                      error: function(user, error) {
                                        alert("User cancelled the Facebook login or did not fully authorize.");}
                                      });
 };

 function loginSuccessful(user) {
    if (!user.existed()) {
    } else {
      console.log(user);
      console.log("here");
      FB.api("/me?fields=name,email", function(response) {
            console.log(response);
            user.setEmail(response.email);
            user.save();
            mouseflow.tag(response.email);
           });
    }
  $state.go('home');
  };
}]);