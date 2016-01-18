'use strict';
angular.module('designTest')
  .controller('placeslistCtrl', function ($scope,$location) {
    $scope.tasks=[{text:"Click to recommend Nando's to a friend.",status:false},
                  {text:"Click to see all the friends who have recommended Nando's to you.",status:false},
                  {text:"Click to add more places to the list.",status:false},
                  {text:"Click to add II Padrino to the wishlist.",status:false}]
    $scope.plus= function(event){
      $scope.show=true;
     // $timeout(function(){if($scope.show = false){}}, 3000); 
      var coords=event.target.coords.split(',')
      $scope.x=(coords[0])+'px';
      $scope.y=coords[3]+'px';
      console.log($scope.x);
      console.log($scope.y); 
    }
    $scope.donetasks=[];
    $scope.done=function(event){
      if(!$scope.tasks[event.target.id].status){
        $scope.tasks[event.target.id].status=true;
      $scope.donetasks.push($scope.tasks[event.target.id]);
    }
      if($scope.tasks.length==$scope.donetasks.length){
        $location.path("/ask");
      }
    }

  });