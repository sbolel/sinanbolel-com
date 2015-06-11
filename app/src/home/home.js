var homeModule = angular.module('home',[]);

homeModule.config(function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      controller: 'HomeCtrl',
      template: '<ui-view/>'
    })
    .state('home.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'templates/home.index.html'
        }
      }
    });
});

homeModule.controller('HomeCtrl', function($scope) {
  $scope.alert = '';
});

