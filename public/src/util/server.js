var serverUtil = angular.module('thinkcrazy.server', []);

// serverUtil.constant('SERVER_URL', 'http://localhost:4000');
serverUtil.constant('SERVER_URL', 'https://thinkcrazy-dev.herokuapp.com');
serverUtil.constant('PING_PARAMS', '?firebase=sinanbolel');

serverUtil.service('ServerService', 
                  ['$log', '$q', '$http', 'SERVER_URL', 'PING_PARAMS',
          function($log, $q, $http, SERVER_URL, PING_PARAMS){
  
  var that = this;

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
        $log.debug('Server ping',status);
        deferred.resolve({data: data, status: status, headers: headers, config: config});
      }).error(function(){
        $log.error('Server ping failed.');
        deferred.reject('Server ping failed.');
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

  return that;
}]);