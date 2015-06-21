var clientsModule = angular.module('clients',[]);

clientsModule.config(function ($stateProvider) {
  $stateProvider
    .state('clients', {
      url: '/clients',
      abstract: true,
      controller: 'ClientsController',
      template: '<ui-view/>'
    })
    .state('clients.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'templates/clients.index.html'
        }
      }
    });

});

clientsModule.controller('ClientsController', function($log, $scope, ObjectFactory) {

  $scope.init = function() {
    $scope.tableOptions = {
      enableFiltering: true,
      columnDefs: LeadsTable
    }
  };

  var clients = new ObjectFactory(['clients'], 50).then(function(data){
    $scope.clients = data;
    $scope.tableOptions.data = $scope.clients;
  });

});
