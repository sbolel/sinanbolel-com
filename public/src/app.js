var appModule = angular.module('SinanBolelApp', [
  'ui.router',
  'firebase',
  'ngMaterial',
  'mdLayout',
  'firebaseForm',
  'sinanbolel.home'
]);

appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com');

appModule.config(['$urlRouterProvider', '$locationProvider', '$logProvider', 'firebaseFormProvider', 'FBURL', 
  function ($urlRouterProvider, $locationProvider, $logProvider, firebaseFormProvider, FBURL) {
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  firebaseFormProvider.setFirebaseUrl(FBURL+'/messages');
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', function ($log, $rootScope, $state, $stateParams) {
  // ServerService.ping();
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    if (error === 'AUTH_REQUIRED') {
      $state.go('user.login');
    }
  });
}]);
