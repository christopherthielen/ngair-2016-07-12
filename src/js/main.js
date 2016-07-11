var app = angular.module('ngair', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/m/');
  
  $stateProvider.state({
    name: 'app',
    url: '/m/',
    resolve: {
      folders: function(Folders) {
        return Folders.all();
      }
    },
    templateUrl: '/src/partials/app.html',
    controller: 'AppController',
    controllerAs: '$ctrl'
  });
  
  $stateProvider.state({
    name: 'app.folder',
    url: ':folderId',
    params: {
      folderId: 'inbox'
    },
    resolve: {
      folder: function($stateParams, Folders) {
        return Folders.get($stateParams.folderId);
      },
      messages: function(folder, Messages) {
        return Messages.byFolder(folder);
      }
    },
    views: {
      "messages@app": {
        templateUrl: '/src/partials/folder.html',
        controller: 'FolderController',
        controllerAs: '$ctrl'
      }
    }
  });
  
  $stateProvider.state({
    name: 'app.folder.message',
    url: '/:messageId',
    resolve: {
      message: function(messages, $stateParams) {
        return messages.find(function(message) {
          return message._id === $stateParams.messageId;
        })
      }
    },
    views: {
      "message@app": {
        templateUrl: '/src/partials/message.html',
        controller: 'MessageController',
        controllerAs: '$ctrl'
      }
    }
  });

  $stateProvider.state({
    name: 'login',
    url: '/login',
    templateUrl: '/src/partials/login.html',
    controller: 'LoginController',
    controllerAs: '$ctrl'
  });

});



app.run(function($rootScope, $state, AuthService) {

  $rootScope.$on("$stateChangeStart", function(event, toState) {
    if (toState.name === 'app') {
      event.preventDefault();
      $state.go('app.folder');
    }
  });

  $rootScope.$on("$stateChangeStart", function(event, toState) {
    if (!AuthService.user && toState.name !== 'login') {
      event.preventDefault();
      $state.go('login');
    }
  });

});


app.run(function($rootScope) {

  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    console.log("$stateChangeStart: " + toState.name);
  });

  $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
    console.log("$stateChangeSuccess: " + toState.name);
  });

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log("$stateChangeError: " + toState.name);
    console.log(error);
  });

});