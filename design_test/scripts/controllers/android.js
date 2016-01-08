'use strict';
angular.module('designTest')
  .controller('AndroidCtrl', function ($scope) {
    $scope.random = Math.floor(Math.random() *4 +1);
    $scope.tasks=[{text:"taks 0",status:false}]
   	$scope.donetasks=[];
    $scope.done=function(event){
    	console.log(event.target);
    	$scope.tasks[event.target.title].status=true;
    	$scope.donetasks.push($scope.tasks[event.target.title]);
    	$scope.tasks.splice(event.target.title,1);
    	if($scope.tasks.length==0){
    		$scope.alldone=true;
    	}
    }

  });