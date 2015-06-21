var projectsModule = angular.module('projects',[]);

projectsModule.config(function ($stateProvider) {
  $stateProvider
    .state('projects', {
      url: '/projects',
      abstract: true,
      controller: 'ProjectsController',
      template: '<ui-view/>'
    })
    .state('projects.index', {
      url: '',
      views: {
        '': {
          templateUrl: 'templates/projects.index.html'
        }
      }
    });

});

projectsModule.controller('ProjectsController', function($log, $scope, ObjectFactory) {

  $scope.init = function() {
    $scope.tableOptions = {
      enableFiltering: true,
      columnDefs: LeadsTable
    }
  };

  var projects = new ObjectFactory(['projects'], 50).then(function(data){
    $scope.projects = data;
    $scope.tableOptions.data = $scope.projects;
  });

});
