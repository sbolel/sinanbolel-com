var adminModule = angular.module('admin',[
  'ui.grid', 'ui.grid.resizeColumns',
  'clients', 'projects', 'tables'
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

adminModule.controller('AdminController', function($log, $rootScope, $scope, $state, ObjectFactory, StateService, TableFactory) {

  var state;
  var table;

  var setTableData = function() {
    $scope.tableOptions.data = $scope[state];
  };

  $scope.init = function() {
    state = StateService.getLastChild();
    StateService.loadData().then(function(dataObject){
      $scope[state] = dataObject.contents;
      setTableData();
    });
    table = TableFactory[state];
    $scope.tableOptions = {
      enableFiltering: true,
      columnDefs: table
    }
  };

  $scope.createObject = function(objectData) {
    $scope[state].$add(objectData);
    // show table data and ask for input
  };

  $scope.viewObject = function() {

  };

  $scope.editObject = function() {

  };

  $scope.removeObject = function() {

  };

});