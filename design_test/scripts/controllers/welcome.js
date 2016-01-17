'use strict';
angular.module('designTest')
  .controller('welcomeCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Select places you have visited",status:false},
                  {text:"Select places you would like to visit.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/placesmap");
      }
    }

  });