angular.module('SinanBolelApp', [
  'firebase',
  'ngAnimate',
  'ngMaterial',
  'ui.router',
  'mdLayout',
  'firebaseForm'
])

.constant('FBURL', 'https://sinanbolel.firebaseio.com')

.config(function ($locationProvider, $stateProvider, $urlRouterProvider, firebaseFormProvider, FBURL) {

  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('home.index', {
      url: '',
      views: {
        '': {
          templateUrl: '/templates/home.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix('!');
  firebaseFormProvider.setFirebaseUrl(FBURL+'/messages');
})

.run(function ($log, $rootScope, $state, $stateParams) {
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    if (error === 'AUTH_REQUIRED') {
      $state.go('user.login');
    }
  });
})

.controller('HomeController',function ($scope, $timeout){
  $scope.init = function(){
    $timeout(function(){
      $scope.visible = true;
      console.debug('done');
    }, 5)
  }
});