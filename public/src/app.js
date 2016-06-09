angular.module('SinanBolelApp', [
  'ngAnimate',
  'ngMaterial',
  'ui.router',
])

.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
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
})

.controller('HomeController', function($scope, $timeout, $location) {
  $scope.init = () => {
    $timeout(() => {
      $scope.visible = true;
    });
  };
});
