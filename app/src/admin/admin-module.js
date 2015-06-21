var adminModule = angular.module('admin',[
  'ui.grid', 'ui.grid.resizeColumns',
  'clients', 'projects'
]);

adminModule.config(function ($stateProvider) {
  $stateProvider
    .state('admin', {
      url: '/admin',
      abstract: true,
      controller: 'AdminController',
      templateUrl: 'src/admin/templates/admin.index.html'
    })
    .state('admin.index', {
      url: '',
      views: {
        '': {
          template: 'Hello Admin'
        }
      }
    })
    .state('admin.clients', {
      url: '/clients',
      views: {
        '': {
          templateUrl: 'src/admin/templates/clients.index.html'
        }
      }
    })
    .state('admin.projects', {
      url: '/projects',
      views: {
        '': {
          templateUrl: 'src/admin/templates/projects.index.html'
        }
      }
    })
    .state('admin.leads', {
      url: '/leads',
      views: {
        '': {
          templateUrl: 'src/admin/templates/leads.index.html'
        }
      }
    });

});

adminModule.controller('AdminController', function($log, $scope, ObjectFactory, LeadsTable) {

  $scope.init = function() {
    $scope.tableOptions = {
      enableFiltering: true,
      columnDefs: LeadsTable
    }
  };

  var leads = new ObjectFactory(['leads'], 50).then(function(data){
    $scope.leads = data;
    $scope.tableOptions.data = $scope.leads;
  });

});