var myapp = angular.module("myApp");
myapp.directive('placeTile', [function() {
  return {
    templateUrl : 'tile/placeTile.html',
    controllerAs : 'ctrl',
    controller : ['$attrs', '$scope', function($attrs, $scope) {
      this.place = $scope.$eval($attrs.place);
    }]
}
}]);