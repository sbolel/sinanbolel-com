var layoutModule = angular.module('layout', []);

layoutModule.controller('LayoutCtrl', function($rootScope, $scope, $state, LayoutService){
  $scope.goBack = function(){
    var backState = $rootScope.$state.$back;
    if ( backState && (backState.name!='') ) {
      $state.go(backState.name)
    } else {
      $state.go('workspace.home');
    }
  }
  $scope.toggleRight = function() {
    LayoutService.toggleRight();
  };
  $scope.toggleLeft = function() { 
    LayoutService.toggleLeft();
  };
});

layoutModule.service('LayoutService', function($mdSidenav){
  this.toggleRight = function() {
    $mdSidenav('right').toggle().then( function() { console.debug("toggle RIGHT is done"); });
  };
  this.toggleLeft = function() {
    $mdSidenav('left').toggle().then( function(){ console.debug("toggle left is done"); });
  }
});