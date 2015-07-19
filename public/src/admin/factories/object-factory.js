adminModule.factory('ObjectFactory', ['$log', '$q', 'DataObject', 'FBURL', function($log, $q, DataObject, FBURL){
  return function(listPath){
    var deferred = $q.defer();
    if(listPath.constructor === Array){
      var pathString = "/" + listPath.join("/");
      var objectRef = new Firebase(FBURL+pathString);
      obj = new DataObject(objectRef);
      obj.$loaded().then(function(){
        $log.debug(pathString+" loaded.");
        deferred.resolve(obj);
      });
    } else {
      $log.error("Missing listPath.");
      deferred.reject("Missing listPath.");
    }
    return deferred.promise;
  }
}]);

adminModule.factory('DataObject', ['$firebaseAuth', '$firebaseArray', '$q', 'FBURL', function($firebaseAuth, $firebaseArray, $q, FBURL){
  return $firebaseArray.$extend({
    $$defaults: {

    }
  });
}]);