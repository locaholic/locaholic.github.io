'use strict';
angular.module('designTest')
  .controller('recommendCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Recommend the last restaurant you visited to a friend.",status:false},
                  {text:"Respond to the questions you are asked.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/tip");
      }
    }

  });