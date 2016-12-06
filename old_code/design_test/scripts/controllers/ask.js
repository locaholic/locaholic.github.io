'use strict';
angular.module('designTest')
  .controller('askCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Click to request a recomendation from friends.",status:false},
                  {text:"Click to view questions yet to be answered by friends.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/recommend");
      }
    }

  });