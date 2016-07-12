import "./bootstrap";

import {app} from "./ngmodule";

import "./services/authService";
import "./services/datasources";

import {App} from "./components/app.component";
import {Message} from "./components/message.component";
import {Folder} from "./components/folder.component";
import {Login} from "./components/login.component";

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/m/');

  $stateProvider.state({
    name: 'app',
    url: '/m/',
    redirectTo: 'app.folder',
    data: { requiresAuth: true },
    resolve: {
      folders: function(Folders) {
        return Folders.all();
      }
    },
    component: App
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
      "messages@app": { component: Folder }
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
      "message@app": { component: Message }
    }
  });

  $stateProvider.state({
    name: 'login',
    url: '/login',
    component: Login
  });

});



app.run(function($transitions, $state, AuthService) {
  function stateRequiresAuth(state) {
    return state.data && state.data.requiresAuth;
  }

  function redirectUnauthenticatedToLogin() {
    if (!AuthService.user) {
      return $state.target('login');
    }
  }

  $transitions.onStart({ to: stateRequiresAuth }, redirectUnauthenticatedToLogin);
});

app.run(function($trace) {
  $trace.enable("TRANSITION");
});