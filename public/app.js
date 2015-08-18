var appModule = angular.module('SinanBolelApp', [
  'trackJs',
  'ui.router',
  'firebase',
  'angularMoment',
  'ngMaterial',
  'mdLayout',
  'firebaseForm',
  'sinanbolel.home'
]);

appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com');

appModule.config(['$urlRouterProvider', '$logProvider', 'firebaseFormProvider', 'FBURL', 
  function ($urlRouterProvider, $logProvider, firebaseFormProvider, FBURL) {
  $logProvider.debugEnabled(false);
  $urlRouterProvider.otherwise('/');
  firebaseFormProvider.setFirebaseUrl(FBURL+'/messages');
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', function ($log, $rootScope, $state, $stateParams) {
  // ServerService.ping();
  // $rootScope.$state = $state;
  // $rootScope.$stateParams = $stateParams;
  // $rootScope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState,fromParams, error){ 
    // $rootScope.$state.$back = fromState;
  // });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    if (error === 'AUTH_REQUIRED') {
      $state.go('user.login');
    }
  });
}]);
