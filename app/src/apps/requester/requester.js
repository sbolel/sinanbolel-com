var requesterModule = angular.module('thinkcrazy.apps.requester', [
  'thinkcrazy.apps.requester.service'
  ]);

requesterModule.config(function ($stateProvider) {
  $stateProvider
    .state('apps.requester', {
      url: '/requester',
      controller: 'RequesterAppController',
      templateUrl: 'src/apps/requester/requester.html'
    });
});

requesterModule.controller('RequesterAppController', ['$log', function($log){



}]);