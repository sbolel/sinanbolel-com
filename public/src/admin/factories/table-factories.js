var tablesModule = angular.module('tables',[])
.factory('TableFactory', ['uiGridConstants', function(uiGridConstants){
  var self = {
    leads: [
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
      displayName: 'Phone',
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
    }
  ],
  clients: [
    { 
      name: 'active',
      field: 'active',
      displayName: 'Health',
      headerCellTemplate: '<md-button class="md-icon-button" aria-label="Projects"><i class="ion-ios-lightbulb"></i></md-button>',
      type: 'bool',
      width: 60
    },
    { 
      name: 'id',
      field: '$id',
      displayName: '$id',
      type: 'string'
    },
    { 
      name: 'name',
      field: 'name',
      displayName: 'Name',
      type: 'string'
    },
    { 
      name: 'email',
      field: 'email',
      displayName: 'Email',
      type: 'string'
    },
    { 
      name: 'phone',
      field: 'phone',
      displayName: 'Phone Number',
      type: 'string'
    },
    {
      name: 'project',
      field: 'currentProject',
      displayName: 'Current Project',
      type: 'string'
    },
    {
      name: 'invited-at',
      field: 'invitedAt',
      displayName: 'Invited',
      type: 'number'
    },
    {
      name: 'joined-at',
      field: 'joinedAt',
      displayName: 'Joined',
      type: 'number'
    }
    // {
    //   name: 'submitDate',
    //   field: 'submitAt',
    //   displayName: 'Date',
    //   type: 'date',
    //   cellTemplate: "<span>{{row.entity.submitAt  | amDateFormat:'MM/DD/YY'}}</span>",
    //   width: 100
    // },
    // {
    //   name: 'submitTime',
    //   field: 'submitAt',
    //   displayName: 'Time',
    //   type: 'date',
    //   cellTemplate: "<span>{{row.entity.submitAt  | amDateFormat:'HH:mm:ss ZZ'}}</span>",
    //   width: 130
    // },
  ],
  projects: [
    { 
      name: 'project-name',
      field: 'name',
      displayName: 'Name',
      type: 'string'
    },
    { 
      name: 'client',
      field: 'client',
      displayName: 'Client',
      type: 'string'
    },
    { 
      name: 'documents',
      field: 'documents',
      displayName: 'Docs',
      type: 'number',
    }
  ]
}
return self;
}]);