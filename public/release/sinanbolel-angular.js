String.prototype.condense = function(){
  'use strict';
  return this.replace(/(\r\n|\n|\r)/gm,"");
};
var appModule = angular.module('SinanBolelApp', [
  'trackJs',
  'ui.router',
  'firebase',
  'angularMoment',
  'ngMaterial',
  'mdLayout',
  'firebaseForm',
  'sinanbolel.home'
]);

appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com');

appModule.config(['$urlRouterProvider', '$logProvider', 'firebaseFormProvider', 'FBURL', 
  function ($urlRouterProvider, $logProvider, firebaseFormProvider, FBURL) {
  $logProvider.debugEnabled(false);
  $urlRouterProvider.otherwise('/');
  firebaseFormProvider.setFirebaseUrl(FBURL+'/messages');
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', function ($log, $rootScope, $state, $stateParams) {
  // ServerService.ping();
  // $rootScope.$state = $state;
  // $rootScope.$stateParams = $stateParams;
  // $rootScope.$on('$stateChangeSuccess', function(event,toState,toParams,fromState,fromParams, error){ 
    // $rootScope.$state.$back = fromState;
  // });
  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $log.error(error);
    if (error === 'AUTH_REQUIRED') {
      $state.go('user.login');
    }
  });
}]);

appModule.homeModule = angular.module('sinanbolel.home',[]);

appModule.homeModule.config(['$stateProvider', function ($stateProvider) {
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

appModule.homeModule.controller('HomeController',[function (){


}]);

'use strict';

var serverUtil = angular.module('sinanbolel.server', [])
  .constant('SERVER_URL', 'https://sinanbolel.herokuapp.com')
  .constant('PING_PARAMS', '?env=dev');

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