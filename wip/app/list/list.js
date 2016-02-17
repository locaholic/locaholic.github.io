
angular.module('myApp')
.controller('placeCtrl',['$scope','$stateParams','uiGmapIsReady',function ($scope,$stateParams,uiGmapIsReady) {
    
    $scope.share=function(placeId){
        FB.ui({
          method: 'send',
          link: 'http://www.nytimes.com/interactive/2015/04/15/travel/europe-favorite-streets.html?'+placeId,
        });
    }
                        
    
  }]);