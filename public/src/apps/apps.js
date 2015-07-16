var appsModule = angular.module('thinkcrazy.apps', [
  'thinkcrazy.apps.requester'
  ]);

appsModule.config(function ($stateProvider) {
  $stateProvider
    .state('apps', {
      url: '/apps',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('apps.home', {
      url: '',
      templateUrl: 'src/apps/apps.html'
    })
});
