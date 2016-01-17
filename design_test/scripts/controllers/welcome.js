'use strict';
angular.module('designTest')
  .controller('welcomeCtrl', function ($scope,$window) {
    $scope.tasks=[{text:"Select places you have visited",status:false},
                  {text:"Select places you would like to visit.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      console.log(event.target.id);
      $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
      // $scope.tasks.splice(event.target.id,1);
      if($scope.tasks.length==$scope.donetasks.length){
        $window.location.href="#placesmap";
      }
    }

  });