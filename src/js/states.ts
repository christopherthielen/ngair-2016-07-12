import {App} from "./components/app.component";
import {Message} from "./components/message.component";
import {Folder} from "./components/folder.component";
import {Login} from "./components/login.component";
import {Ng2StateDeclaration, Transition} from "ui-router-ng2/ng2";
import {Folders, Messages} from "./services/datasources";

let appState: Ng2StateDeclaration = {
  name: 'app',
  url: '/m/',
  redirectTo: () => 'app.folder',
  data: { requiresAuth: true },
  resolve: [
    { token: 'folders', deps: [Folders], resolveFn: (Folders) => Folders.all() }
  ],
  component: App
};

let folderState: Ng2StateDeclaration = {
  name: 'app.folder',
  url: ':folderId',
  params: {
    folderId: 'inbox'
  },
  resolve: [
    { token: 'folder', deps: [Transition, Folders], resolveFn: (trans, Folders) => Folders.get(trans.params().folderId) },
    { token: 'messages', deps: ['folder', Messages], resolveFn: (folder, Messages) => Messages.byFolder(folder) },
  ],
  views: {
    "messages@app": { component: Folder }
  }
};

let messageState: Ng2StateDeclaration = {
  name: 'app.folder.message',
  url: '/:messageId',
  resolve: [
    { token: 'message', deps: ['messages', Transition],
      resolveFn: (messages, trans) => messages.find(message => message._id === trans.params().messageId) }
  ],
  views: {
    "message@app": { component: Message }
  }
};

let loginState = {
  name: 'login',
  url: '/login',
  component: Login
};

export let STATES = [ appState, folderState, messageState, loginState];
