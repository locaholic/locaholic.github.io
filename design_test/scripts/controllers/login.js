'use strict';
angular.module('designTest')
  .controller('loginCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Login With Facebook",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      console.log(event.target.id);
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/welcome");
      }
    }

  });