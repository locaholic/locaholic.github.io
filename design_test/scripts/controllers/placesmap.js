'use strict';
angular.module('designTest')
  .controller('placesmapCtrl', function ($scope,$window) {
    $scope.tasks=[{text:"Click to see more information about Nando's",status:false},
                  {text:"Click to see a list view of places.",status:false}]
    $scope.donetasks=[];
    $scope.done=function(event){
      console.log(event.target.id);
      $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
      $scope.tasks.splice(event.target.id,1);
      if($scope.tasks.length==0){
        $window.location.href="#placeslist";
      }
    }

  });