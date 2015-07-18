userModule.factory('Lead', function($log, $q, $rootScope, $firebaseAuth, LeadFactory, FBURL){
  var userData;
  return function(scope){
      var deferred = $q.defer();
      var leadsRef = new Firebase(FBURL+'/leads');
      var timestamp = Firebase.ServerValue.TIMESTAMP;
      // var thisLeadRef = leadsRef.push({events:{accessedAt: timestamp});
      var thisLeadRef = leadsRef.push();
      var leadData = new LeadFactory(thisLeadRef);
      leadData.$bindTo(scope, "leadData").then(function(){
        $log.debug("Bound lead form.");
        deferred.resolve(leadData);
      });
      return deferred.promise;
    }
});

userModule.factory('LeadFactory', function($log, $rootScope, $firebaseAuth, $firebaseObject, $q, FBURL){
  var ref = new Firebase(FBURL);
  return $firebaseObject.$extend({
    $$defaults: {
      name: null,
      email: null,
      message: null
    },
    $submit: function(callback) {
      deferred = $q.defer();
      this.submitAt = Firebase.ServerValue.TIMESTAMP;
      this.$save().then(function(ref){
        $log.debug("Submitted form.");
        deferred.resolve(ref);
      }).catch(function(error){
        $log.error(error);
        deferred.reject(error);
      });
      return deferred.promise;
    }
  });
});
