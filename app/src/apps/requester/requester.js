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

requesterModule.controller('RequesterAppController', ['$log', '$scope', 'RequesterService', function($log, $scope, RequesterService){

  $scope.requester = {
    $loading: false,
    $requestKeys: [],
    params: {}
  };

  $scope.makeRequest = function(){
    $scope.requester.$loading = true;
    RequesterService.createRequest($scope.requester.url, $scope.requester.params)
      .then(function(data, status, headers, config){
        $scope.requester.response = data;
    }).catch(function(key, data, status, headers, config){
        $scope.requester.response = data;
    });
  };

  function detectResponseType(){
    var key = $scope.requester.$requestKeys[$scope.requester.$requestKeys.length=1];
    var res = RequesterService.getRequestByKey(key);
    $log.debug('Got request[',key,']: ',res);
  };

}]);