String.prototype.condense = function(){
  'use strict';
  return this.replace(/(\r\n|\n|\r)/gm,"");
};
'use strict';

var appModule = angular.module('SinanBolelApp', [
  'trackJs',
  'ui.router',
  'firebase',
  'angularMoment',
  'ngMaterial',
  'cmsClient',
  'mdLayout',
  'server',
  'thinkcrazy.home',
  'thinkcrazy.apps',
]);

appModule.constant('AUTO_ANON', true);
appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com');

appModule.config(['$urlRouterProvider', '$logProvider', '$mdThemingProvider', 'cmsClientProvider', 'FBURL', function ($urlRouterProvider, $logProvider, $mdThemingProvider, cmsClientProvider, FBURL) {
  $urlRouterProvider.otherwise('/');
  $logProvider.debugEnabled(false);
  cmsClientProvider.setContentUrl(FBURL+'/_sinanbolel/content');
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', 'ServerService', function ($log, $rootScope, $state, $stateParams, ServerService) {
    ServerService.ping();
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // $rootScope.$on("$stateChangeSuccess", function(event,toState,toParams,fromState,fromParams, error){ 
    //   $log.debug("$stateChangeSuccess, from:",fromState,"to:",toState, $rootScope.$state);
    //   $rootScope.$state.$back = fromState;
    // });
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
      if (error === "AUTH_REQUIRED") {
        $log.error(error);
        $state.go("user.login");
      } else {
        $log.error(error);
      }
    });
}]);

appModule.filter('reverse', function() {
  return function(items) {
    return _.toArray(items).slice().reverse();
  };
});

'use strict';

var homeModule = angular.module('thinkcrazy.home',[]);

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

homeModule.controller('HomeController',['$log', '$scope', '$mdToast', 'FBURL', function ($log, $scope, $mdToast, FBURL){
  
  var messagesList = new Firebase(FBURL+'/messages');

  var MessageRef = function(){
    return messagesList.push();
  };

  var toastPosition = {bottom: true, top: false, left: true, right: true};

  $scope.submit = function(){
    submitMessage();
  };

  function submitMessage(){
    if ($scope.contact.$valid) {
      var msgRef = new MessageRef();
      var msg = timestampMessage();
      msgRef.set(msg, onMessageSubmit);
    }
  }

  function getToastPosition(){
    return Object.keys(toastPosition).filter(function(pos){
      return toastPosition[pos];
    }).join(' ');
  }

  function onMessageSubmit(error){
    if(error){
      $log.error('Error submitting contact message:',error);
      $mdToast.show($mdToast.simple().content('Error!').position(getToastPosition()).hideDelay(5000));
    } else {
      $log.debug('Submitted contact message.');
      $scope.messageData = {};
      $scope.contact.$setUntouched();
      $scope.contact.$setPristine();
      $mdToast.show($mdToast.simple().content('Sent!').position(getToastPosition()).hideDelay(5000));
    }
  }

  function timestampMessage(){
    $scope.messageData.submitAt = Firebase.ServerValue.TIMESTAMP;
    $scope.messageData.submitAtString = Date($scope.messageData.submitAt);
    return $scope.messageData;
  }

}]);

var appsModule = angular.module('thinkcrazy.apps', [
  'thinkcrazy.apps.requester'
  ]);

appsModule.config(['$stateProvider', function($stateProvider) {
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
}]);

var requesterModule = angular.module('thinkcrazy.apps.requester.service', [])

.service('RequesterService', ['$log', '$q', '$http', function($log, $q, $http){

var that = this;
var requestsArray = [];
var responseArray = [];

var Request = function(url, params){
  if(typeof(url)!=='undefined'){
    this.url = url;
  } else {
    this.url = '';
  }
  if(typeof(params)!=='undefined'){
    this.params = params;
  } else {
    this.params = {};
  }
  this.response = {
    data: {},
    status: {},
    headers: {},
    config: {}
  };
  this.key = requestsArray.length;
  requestsArray.push(this);
  return this;
};

Request.prototype.setResponse = function(data, status, headers, config){
  this.response = {
    data: data,
    status: status,
    headers: headers,
    config: config
  };
};

Request.prototype.execute = function(){
  var that = this;
  var deferred = $q.defer();
  if(typeof(this.url)==='undefined'||typeof(this.params)==='undefined'){
    deferred.reject('Missing request url/params.');
  }
  $http.get(this.url, this.params).
    success(function(data, status, headers, config) {
      that.setResponse(data, status, headers, config);
      deferred.resolve(data, status, headers, config);
    }).
    error(function(data, status, headers, config) {
      that.setResponse(data, status, headers, config);
      deferred.reject(data, status, headers, config);
    });
  return deferred.promise;
};

Request.prototype.cache = function(){
  
};

this.getRequestByKey = function(requestKey){
  if(typeof(requestsArray[requestKey])!=='undefined'){
    return requestsArray[requestKey];
  } else {
    return null;
  }
};

this.createRequest = function(url, params){
  var deferred = $q.defer()
  var req = new Request(url, params);
  req.execute().then(function(data, status, headers, config){
    $log.debug('Completed request:\n', data, status, headers, config);
    deferred.resolve(data, status, headers, config);
  }).catch(function(data, status, headers, config){
    $log.error('Error completing request\n:', data, status, headers, config);
    deferred.reject(data, status, headers, config);
  });
  return deferred.promise;
};


return this;

}]);
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
'use strict';

var serverUtil = angular.module('server', []);

// serverUtil.constant('SERVER_URL', 'http://localhost:4000');
serverUtil.constant('SERVER_URL', 'https://sinanbolel.herokuapp.com');
serverUtil.constant('PING_PARAMS', '?env=dev');

serverUtil.service('ServerService', ['$log', '$q', '$http', 'SERVER_URL', 'PING_PARAMS', function ($log, $q, $http, SERVER_URL, PING_PARAMS){
  
  this.getServerUrl = function(){
    return SERVER_URL;
  };

  this.ping = function(params){
    var deferred = $q.defer();
    var completeUrlParamsString = PING_PARAMS;
    if(params){
      completeUrlParamsString += params;
    }
    $log.debug('Pinging server with params',completeUrlParamsString);
    $http.get(SERVER_URL+'/ping'+completeUrlParamsString)
      .success(function(data, status, headers, config) {
        $log.debug('Server ping success. \n - status:', status);
        deferred.resolve({data: data, status: status, headers: headers, config: config});
      }).error(function(data, status, headers, config){
        $log.error('Server ping failed. \n - status:', status, '\n - data:', data);
        deferred.reject({data: data, status: status, headers: headers, config: config});
      });
    return deferred.promise;
  };

  this.request = {
    xmlToJson: function(xml){
      var deferred = $q.defer();
      var req = {
       method: 'POST',
       url: SERVER_URL+'/services/xmlToJson',
       headers: {
         'Content-Type': undefined
       },
       data: xml
      };
      $http(req)
        .success(function(data, status, headers, config) {
           $log.debug('server.xmlToJson',status);
           deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
           $log.error('server.xmlToJson',status);
           deferred.reject(data, status, headers, config);
        });
      return deferred.promise;
    }
  };

  return this;
}]);