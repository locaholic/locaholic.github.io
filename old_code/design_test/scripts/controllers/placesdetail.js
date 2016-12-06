'use strict';
angular.module('designTest')
  .controller('placesdetailCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Click to see more information about Nando's",status:false},
                  {text:"Click to see a list view of places.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/placesdetail");
      }
    }

  });