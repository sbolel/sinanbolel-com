var layoutModule = angular.module('layout', []);

layoutModule.controller('LayoutCtrl', ['$rootScope', '$scope', '$state', '$timeout', '$mdSidenav', '$mdUtil', '$log', 'LayoutService',
  function($rootScope, $scope, $state, $timeout, $mdSidenav, $mdUtil, $log, LayoutService){
  
  $scope.goBack = function(){
    var backState = $rootScope.$state.$back;
    if ( backState && (backState.name!='') ) {
      $state.go(backState.name)
    } else {
      $state.go('workspace.home');
    }
  };

  $scope.goTo = function(stateName) {
    $state.go(stateName);
  };

  $scope.toggleLeft = buildToggler('left');
  $scope.toggleRight = buildToggler('right');

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        },300);
    return debounceFn;
  };
}])

.controller('LeftCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close LEFT is done");
      });
  };
}])
.controller('RightCtrl', ['$scope', '$timeout', '$mdSidenav', '$log', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
}]);

layoutModule.service('LayoutService',['$mdSidenav', function($mdSidenav){
  this.toggleRight = function() {
    $mdSidenav('right').toggle().then( function() { console.debug("toggle RIGHT is done"); });
  };
  this.toggleLeft = function() {
    $mdSidenav('left').toggle().then( function(){ console.debug("toggle left is done"); });
  }
}]);
