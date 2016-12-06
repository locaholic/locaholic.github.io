'use strict';
angular.module('designTest')
  .controller('loginCtrl', function ($scope,$location,$rootScope) {
    $scope.tasks=[{text:"Login With Facebook",status:false}]
    $scope.donetasks=[];
     $scope.login=function() {
    // console.log(Parse.FacebookUtils.getLoginStatus());
    Parse.FacebookUtils.logIn('email', {
  success: function(user) {
    if (!user.existed()) {
      alert("User signed up and logged in through Facebook!");
      console.log(user);
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
  },
  error: function(user, error) {
    alert("User cancelled the Facebook login or did not fully authorize.");
    $location.path('/login');
  }
});
 };
    $scope.done=function(event){
      console.log(event.target.id);
      if(!$scope.tasks[event.target.id].status){
        $scope.login();
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
       $location.path('/welcome'); 
      }
    }

  });