var homeModule = angular.module('home',[]);

homeModule.config(['$stateProvider', function ($stateProvider) {
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

homeModule.controller('HomeController',['$log', '$scope', '$mdToast', 'Lead', function($log, $scope, $mdToast, Lead){
  
  $scope.leadData = {};

  var lead;

  var setLead = function(){
    lead = new Lead($scope).then(function(leadData){
      lead = leadData;
    });
  };
  var toastPosition = {
    bottom: true,
    top: false,
    left: true,
    right: true
  };
  var getToastPosition = function() {
    return Object.keys(toastPosition)
      .filter(function(pos) { return toastPosition[pos]; })
      .join(' ');
  };
  var showToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .content('Sent!')
        .position(getToastPosition())
        .hideDelay(5000)
    );
  };
  $scope.submit = function(){
    if ($scope.leadData) {
      lead.$submit().then(function(){
        lead.$destroy();
        $scope.leadData.name = '';
        $scope.leadData.email = '';
        $scope.leadData.message = '';
        showToast();
        lead = null;
        setLead();
      });
    }
  };
  setLead();
}]);
