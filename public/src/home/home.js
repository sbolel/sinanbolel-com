'use strict';

var homeModule = angular.module('thinkcrazy.home',[]);

homeModule.config(['$stateProvider', function ($stateProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('home.index', {
      url: '',
      views: {
        '': {
          controller: 'HomeController',
          templateUrl: 'src/home/home.html'
        }
      }
    });
}]);

homeModule.controller('HomeController',['$log', '$scope', '$mdToast', 'FBURL', function ($log, $scope, $mdToast, FBURL){
  
  var messagesList = new Firebase(FBURL+'/messages');

  var MessageRef = function(){
    return messagesList.push();
  };

  var toastPosition = {bottom: true, top: false, left: true, right: true};

  $scope.submit = function(){
    submitMessage();
  };

  function submitMessage(){
    if ($scope.contact.$valid) {
      var msgRef = new MessageRef();
      var msg = timestampMessage();
      msgRef.set(msg, onMessageSubmit);
    }
  }

  function getToastPosition(){
    return Object.keys(toastPosition).filter(function(pos){
      return toastPosition[pos];
    }).join(' ');
  }

  function onMessageSubmit(error){
    if(error){
      $log.error('Error submitting contact message:',error);
      $mdToast.show($mdToast.simple().content('Error!').position(getToastPosition()).hideDelay(5000));
    } else {
      $log.debug('Submitted contact message.');
      $scope.messageData = {};
      $scope.contact.$setUntouched();
      $scope.contact.$setPristine();
      $mdToast.show($mdToast.simple().content('Sent!').position(getToastPosition()).hideDelay(5000));
    }
  }

  function timestampMessage(){
    $scope.messageData.submitAt = Firebase.ServerValue.TIMESTAMP;
    $scope.messageData.submitAtString = Date($scope.messageData.submitAt);
    return $scope.messageData;
  }

}]);
