'use strict';
angular.module('designTest')
  .controller('welcomeCtrl', function ($scope,$location) {
    $scope.tasks=[{ text:"Select places you have visited",
                    status:false,
                    welcometext:"Recommend places near you"
                  },
                  {text:"Select places you would like to visit.",
                   status:false,
                   welcometext:"Your Friends have visited these places, have you?"
                  }]
    $scope.redirect=function(url){
      $location.path(url);
    }

    $scope.randomize=function(){
      var rand = Math.floor(Math.random() *2 +1);
      $scope.tasks.splice(rand-1,1);  // remove one task randomly from task list
      $scope.map=Math.floor(Math.random() *2 +1); // choose 1 or 2 [1 means tile is a button 2 means heart is a button]
    }
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