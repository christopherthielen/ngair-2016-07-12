import {app} from "../ngmodule";

function FolderController(Messages) {
  this.senderName = Messages.senderName;
  this.headshotUrl = Messages.headshotUrl;
}

app.component('folder', {
  templateUrl: '/src/partials/folder.html',
  controller: FolderController,
  bindings: { folder: '<', messages: '<' }
});