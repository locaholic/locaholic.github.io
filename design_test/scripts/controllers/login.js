'use strict';
angular.module('designTest')
  .controller('loginCtrl', function ($scope,$window) {
    $scope.tasks=[{text:"Login With Facebook",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      console.log(event.target.id);
      $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
      $scope.tasks.splice(event.target.id,1);
      if($scope.tasks.length==0){
        $window.location.href="#welcome";
      }
    }

  });