var userModule = angular.module('user',[]);

userModule.run(function ($rootScope, UserService) {
  UserService.init();
});

userModule.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('user', {
      url: '',
      abstract: true,
      controller: 'UserCtrl',
      template: '<ui-view/>'
    })
    .state('user.profile', {
      url: '/profile',
      views: {
        '': {
          templateUrl: 'templates/user.profile.html'
        }
      },
      resolve: {
        currentAuth: function(UserService) {
          return UserService.requireAuth();
        }
      }
    })
    .state('user.signup', {
      url: '/signup',
      views: {
        '': {
          templateUrl: 'templates/user.signup.html'
        }
      }
    })
    .state('user.login', {
      url: '/login',
      views: {
        '': {
          templateUrl: 'templates/user.login.html'
        }
      }
    })
    .state('user.logout', {
      url: '/logout',
      template: '<ui-view/>',
      controller: function($log, $state, UserService) {
        $log.debug("Logging out.");
        UserService.logout();
        $state.go('user.login',{alert: 'You have been logged out.'})
      }
    })
});

userModule.controller('UserCtrl', function($log, $scope, $state, UserService) {

  var showAccountErrorAlert = function() {
    alert("Oops, we couldn't log you in.");
  }

  var showMissingInputAlert = function(){
    alert("Please enter your email and password to log in.");
  }

  $scope.incomingUser = {};

  $scope.loginWithPassword = function() {
    if($scope.incomingUser.email && $scope.incomingUser.password) {
      UserService.loginWithPassword($scope.incomingUser, function() {
        $state.go('workspace.home');
      }, function(error){
        $log.error("Login error:",error);
        showAccountErrorAlert();
      });
    } else {
      showMissingInputAlert();
    }
  };

  $scope.signupWithPassword = function() {
    if($scope.incomingUser.email && $scope.incomingUser.password) {
      UserService.createUser($scope.incomingUser, function() {
        // $state.go('workspace.listings.map');
      }, function(error){
        $log.error("Signup error:",error);
        showAccountErrorAlert();
      });
    } else {
      showMissingInputAlert();
    }
  };

});
