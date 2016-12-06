'use strict';
angular.module('designTest')
  .controller('tipCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Personalize your recommendation with a tip/secret.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/thanks");
      }
    }

  });