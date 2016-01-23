'use strict';
angular.module('designTest')
  .controller('loginCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Login With Facebook",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      console.log(event.target.id);
      if(!$scope.tasks[event.target.id].status){
        var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  alert("yay! it worked");
});
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/welcome");
      }
    }

  });