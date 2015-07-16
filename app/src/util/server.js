var serverUtil = angular.module('thinkcrazy.server', []);

serverUtil.constant('SERVER_URL', 'http://localhost:4000');
// serverUtil.constant('SERVER_URL', 'https://thinkcrazy-dev.herokuapp.com/');

serverUtil.service('ServerService', 
                  ['$log', '$q', '$http', 'SERVER_URL',
          function($log, $q, $http, SERVER_URL){
  
  var that = this;

  this.getServerUrl = function(){
    return SERVER_URL;
  };

  this.ping = function(){
    $log.debug('Pinging server...')
    $http.get(SERVER_URL+'/ping')
      .success(function(data, status, headers, config) {
         $log.debug('Server Ping',status);
      });
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