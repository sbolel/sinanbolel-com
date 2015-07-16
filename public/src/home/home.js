var homeModule = angular.module('home',[]);

homeModule.config(function ($stateProvider) {
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
          templateUrl: 'src/home/home.html'
        }
      }
    });
});

