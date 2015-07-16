userModule.factory('User', function($log, $q, $rootScope, $firebaseAuth, $exceptionHandler, UserFactory, FBURL){
  var userData;
  return function(userAuth){
    var deferred = $q.defer();
    if(userAuth.uid){
      var userRef = new Firebase(FBURL+'/users/'+userAuth.provider+'/'+userAuth.uid);
      userData = new UserFactory(userRef);
      $log.debug("Current user:", userData.$id);
      userData.$updateUser();
      userData.$bindTo($rootScope, "userData").then(function() {
        $rootScope.auth = userData.$auth.$getAuth();
        deferred.resolve(userData);
      });
    } else {
      $log.error("User factory did not receive user authentication data.");
      deferred.reject("User(userAuth) - userAuth not inputted.");
    }
    return deferred.promise;
  }
});

userModule.factory('UserFactory', function($rootScope, $firebaseAuth, $firebaseObject, $q, FBURL){
  var ref = new Firebase(FBURL);
  return $firebaseObject.$extend({
    $$defaults: {
      $auth: $firebaseAuth(ref),
    },
    $updateUser: function() {
      var deferred = $q.defer();
      var authDetails = {};
      angular.copy(this.$auth.$getAuth(), authDetails);
      delete authDetails.auth;
      this.auth = authDetails;
      if (authDetails.password) {
        this.auth.email = authDetails.password.email;
      }
      this.$ref().update(this.auth, function(error){
        if(error){
          deferred.reject(error);
        } else {
          deferred.resolve();
        }
      });
      return deferred.promise;
    },
    $connectPreviousSession: function(previousSession) {
      this.$ref().child('previousSession').push(previousSession);
    },
    $logout: function() {
      this.$destroy();
      this.$auth.$unauth();
    }
    // $authWithCustomToken("<CUSTOM_AUTH_TOKEN>").then(function(authData) {
    //   $log.log("Logged in as:", authData.uid);
    // }).catch(function(error) {
    //   $log.error("Authentication failed:", error);
    // });
  });
});
