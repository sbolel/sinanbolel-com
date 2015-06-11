var appModule = angular.module('ThinkCrazyApp', [
  'ngMaterial',
  'ui.router',
  'firebase',
  'user',
  'home',
  'layout'
]);

appModule.constant('FBURL', 'https://getsun-dev.firebaseio.com/');
appModule.value('FBREF', new Firebase('https://getsun-dev.firebaseio.com/'));

appModule.run(function ($log, $rootScope, $state, $stateParams) {
    $log.debug("module.ThinkCrazyApp.run()");
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // $rootScope.$on("$stateChangeSuccess", function(event,toState,toParams,fromState,fromParams, error){ 
    //   $log.debug("$stateChangeSuccess, from:",fromState,"to:",toState, $rootScope.$state);
    //   $rootScope.$state.$back = fromState;
    // });
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $log.error(error);
        $state.go("user.login");
      }
    });
});

appModule.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
});

appModule.filter('reverse', function() {
  return function(items) {
    return _.toArray(items).slice().reverse();
  };
});

