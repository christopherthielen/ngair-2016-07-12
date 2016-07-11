import {app} from "../ngmodule";

class FolderController {
  constructor(Messages) {
    this.senderName = Messages.senderName;
    this.headshotUrl = Messages.headshotUrl;
  }
}

app.component('folder', {
  templateUrl: '/src/partials/folder.html',
  controller: FolderController,
  bindings: { folder: '<', messages: '<' }
});