'use strict';

var appModule = angular.module('SinanBolelApp', [
  'trackJs',
  'ui.router',
  'firebase',
  'angularMoment',
  'ngMaterial',
  'cmsClient',
  'mdLayout',
  'server',
  'thinkcrazy.home',
  'thinkcrazy.apps',
]);

appModule.constant('AUTO_ANON', true);
appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com');

appModule.config(['$urlRouterProvider', '$logProvider', '$mdThemingProvider', 'cmsClientProvider', 'FBURL', function ($urlRouterProvider, $logProvider, $mdThemingProvider, cmsClientProvider, FBURL) {
  $urlRouterProvider.otherwise('/');
  $logProvider.debugEnabled(false);
  cmsClientProvider.setContentUrl(FBURL+'/_sinanbolel/content');
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', 'ServerService', function ($log, $rootScope, $state, $stateParams, ServerService) {
    ServerService.ping();
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
      } else {
        $log.error(error);
      }
    });
}]);

appModule.filter('reverse', function() {
  return function(items) {
    return _.toArray(items).slice().reverse();
  };
});
