'use strict';
angular.module('myApp')
.controller('loginCtrl',['$scope','$state','$rootScope',function($scope,$state,$rootScope) {
  
  $scope.load=function(){
        if($rootScope.sessionUser){
        $scope.currentUser= $rootScope.sessionUser;
        $scope.currentUser.userImg=$rootScope.sessionUser.get('userImg');
        console.log($scope.currentUser.userImg);
      }
    }
  $scope.login=function() {
    console.log("login called");
    console.log($state.$current.name);
  Parse.FacebookUtils.logIn('email', {
                                      success: loginSuccessful,
                                      error: function(user, error) {
                                        alert("User cancelled the Facebook login or did not fully authorize.");}
                                      });
 };
  $scope.logout= function(){
    Parse.User.logOut()
    $rootScope.sessionUser=null;
    console.log($rootScope.sessionUser);
    $state.go('home.login');
  }
 function loginSuccessful(user) {
    if (!user.existed()) {
    } else {
      var url;
      $rootScope.sessionUser=user;
      console.log("here");
      FB.api("/me?fields=name,email,id", function(response) {
            console.log(response);
            user.setEmail(response.email);
            user.save();
            url="/"+response.id+"/picture";
            console.log(url);
            FB.api(
            url,
          function (response) {
            if (response && !response.error) {
              user.set('userImg',response.data.url);
              user.save();
              $scope.$apply();
              }
            }
          );
            mouseflow.tag(response.email);
           }); 
    }
  $state.go('home');
  };
}]);