adminModule.factory('ObjectFactory', function($log, $q, DataObject, FBURL){
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
});

adminModule.factory('DataObject', function($firebaseAuth, $firebaseArray, $q, FBURL){
  return $firebaseArray.$extend({
    $$defaults: {

    }
  });
});

adminModule.factory('LeadsTable', function(uiGridConstants){
  return [
    { 
      name: 'name',
      field: 'name',
      displayName: 'Name',
      type: 'string'
    },
    { 
      field: 'email',
      displayName: 'Email',
      type: 'string'
    },
    { 
      field: 'phone',
      displayName: 'Phone Number',
      type: 'string'
    },
    { 
      name: 'message',
      field: 'message',
      displayName: 'Message',
      type: 'string'
    },
    {
      name: 'submitDate',
      field: 'submitAt',
      displayName: 'Date',
      type: 'date',
      cellTemplate: "<span>{{row.entity.submitAt  | amDateFormat:'MM/DD/YY'}}</span>",
      width: 100
    },
    {
      name: 'submitTime',
      field: 'submitAt',
      displayName: 'Time',
      type: 'date',
      cellTemplate: "<span>{{row.entity.submitAt  | amDateFormat:'HH:mm:ss ZZ'}}</span>",
      width: 130
    },
    {
      name: 'timestamp',
      field: 'submitAt',
      displayName: 'Timestamp',
      type: 'number',
      cellTemplate: '<span>{{row.entity.submitAt}}</span>',
        sort: {
          direction: uiGridConstants.DESC,
          priority: 0
        }
    },
  ];
});