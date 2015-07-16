var cacheModule = angular.module('cache',['LocalStorageModule']);

cacheModule.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider
    .setPrefix('SinanBolelApp')
    .setNotify(true, true);
}]);

cacheModule.factory('Loader', ['$rootScope', function($rootScope){
  this.watchers = [];
  this.checkWatchCall = function(varToWatch, successCb) {
    // console.debug(" - [Loader.checkWatchCallScope] called, args:",arguments);
    if (!$rootScope[varToWatch]) {
      // console.debug(" - [Loader.checkWatchCallScope] ",varToWatch," undefined, Watching...");
      var watcher = $rootScope.$watch(varToWatch, function(newValue,oldValue) {
        if(newValue != oldValue) {
          // console.debug("   - [Loader.checkWatchCallScope] '",varToWatch,"' watcher fired. newValue:",newValue,"oldValue:",oldValue);
          watcher();
          successCb();
        }
      });
    } else {
      // console.debug("   - [Loader.checkWatchCallScope] varToCheck defined, Calling...");
      successCb();
    }
  };
  return this;
}]);

cacheModule.factory('Cache', ['$log', 'localStorageService', function($log, localStorageService) {
  if(localStorageService.isSupported) {
    $log.info("localStorage is supported.");
    var self = {
      type: 'localStorage',
      get: function(key, hitCb, missCb){
        // [TODO]: cache should use a last updated
        var cached = localStorageService.get(key);
        if (cached) {
          $log.debug('Cache HIT key:',key);
          if (hitCb) {
            hitCb(cached);
          }
        } else {
          $log.info('Cache MISS key:',key);
          if (missCb) {
            missCb();
          }
        }
      },
      set: function(key, val){
        return localStorageService.set(key, val);
      }, 
      keys: function(){
        return localStorageService.keys();
      },
      remove: function(key){
        return localStorageService.remove(key);
      },
      clearAll: function(){
        return localStorageService.clearAll();
      },
      bind: function(scope, property){
        scope.unbind = localStorageService.bind(scope, property);
      },
      deriveKey: function(property){
        return localStorageService.deriveKey(property);
      },
      length: function(){
        return localStorageService.length();
      }
    }
    return self;
  } else {
    $log.info("localStorage is not supported.");
    var self = {
      type: 'localStorage',
      get: function(key, hitCb, missCb){
        if(missCb)
          missCb();
      },
      set: function(key, val){
        return null;
      }, 
      keys: function(){
        return null;
      },
      remove: function(key){
        return null;
      },
      clearAll: function(){
        return null;
      },
      bind: function(scope, property){
        scope.property = null;
      },
      deriveKey: function(property){
        return null;
      },
      length: function(){
        return null;
      }
    };
    return self;
  }
}]);