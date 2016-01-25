'use strict';
angular.module('designTest')
  .controller('thanksCtrl', function ($scope,$location) {
    $scope.pass=false;


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
      $location.path('/');
      alert("Your session has been saved!");
     });
    }
  },
  error: function(user, error) {
    alert("User cancelled the Facebook login or did not fully authorize.");
  }
});
 };
  });