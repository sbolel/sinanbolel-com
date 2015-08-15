var requesterModule = angular.module('thinkcrazy.apps.requester', [
  'thinkcrazy.apps.requester.service'
  ]);

requesterModule.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('apps.requester', {
      url: '/requester',
      controller: 'RequesterAppController',
      templateUrl: 'src/apps/requester/requester.html'
    });
}]);

requesterModule.controller('RequesterAppController', ['$log', '$scope', '$http', 'RequesterService', 'ServerService', function($log, $scope, $http, RequesterService, ServerService){

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
  $scope.init = function(){
    ServerService.ping();
  };
  $scope.xmlToJson = function(){
    var xmlString = $scope.requester.response;
    if(xmlString){
      convertData(xmlString.replace(/(\r\n|\n|\r)/gm,""), 'xml', 'json');
    } else {
      $log.error('$scope.requester.response not set');
    }
  }
  function convertData(inputData, inputDataType, outputDataType){
    if(inputDataType==='xml'&&outputDataType==='json'){
      ServerService.request.xmlToJson(inputData).then(function(result){
        $log.debug('convertData.xmlToJson',result);
        $scope.requester.$jsonResult = JSON.parse(result.data);
      });
    } else {
      $log.error('Unknown conversion type.');
    }
  }
  function detectResponseType(){
    var key = $scope.requester.$requestKeys[$scope.requester.$requestKeys.length=1];
    var res = RequesterService.getRequestByKey(key);
    $log.debug('Got request[',key,']: ',res);
  }
}]);