angular.module('sinanbolel.server', [])

.constant('SERVER_URL', 'https://sinanbolel.herokuapp.com')
.constant('PING_PARAMS', '?env=dev')

.service('ServerService', function ($log, $q, $http, SERVER_URL, PING_PARAMS){
  
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
});