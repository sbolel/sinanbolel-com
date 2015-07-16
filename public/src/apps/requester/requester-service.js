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