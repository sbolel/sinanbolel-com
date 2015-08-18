appModule.homeModule = angular.module('sinanbolel.home',[]);

appModule.homeModule.config(['$stateProvider', function ($stateProvider) {
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
          controller: 'HomeController',
          templateUrl: 'src/home/home.html'
        }
      }
    });
}]);

appModule.homeModule.controller('HomeController',[function (){


}]);
