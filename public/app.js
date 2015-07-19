var appModule = angular.module('SinanBolelApp', [
  'trackJs',
  'ui.router',
  'firebase',
  'angularMoment',
  'ngMaterial',
  'layout',
  'home',
  'user',
  'thinkcrazy.server',
  'thinkcrazy.apps',
]);

appModule.constant('AUTO_ANON', true);
appModule.constant('FBURL', 'https://sinanbolel.firebaseio.com/');

appModule.config(['$stateProvider', '$urlRouterProvider', '$logProvider', 'TrackJSProvider',
        function ($stateProvider, $urlRouterProvider, $logProvider, TrackJSProvider) {
  $urlRouterProvider.otherwise('/');
  $logProvider.debugEnabled(false);
  TrackJsProvider.configure({
      version: "1.0.1"
  });
}]);

appModule.run(['$log', '$rootScope', '$state', '$stateParams', 'ServerService',
  function ($log, $rootScope, $state, $stateParams, ServerService) {
    $log.debug("module.SinanBolelApp.run()");
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

appModule.service('StateService', ['$log', '$rootScope', '$state', '$q', 'ObjectFactory', 
                          function($log, $rootScope, $state, $q, ObjectFactory){
  var self = {
    getLastChild: function() {
      var statePath = $state.$current.toString();
      var array = statePath.split('.');
      var res = array[array.length-1];
      return res;
    },
    loadData: function(){
      var deferred = $q.defer();
      var stateName = self.getLastChild();
      var data = new ObjectFactory([stateName], 50).then(function(data){
        var res = {contents: data,state: stateName};
        deferred.resolve(res);
      }).catch(function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }
  };
  return self;
}]);

