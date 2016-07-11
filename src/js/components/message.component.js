import {app} from "../ngmodule";

function MessageController($state, Messages) {
  this.$state = $state;
  this.Messages = Messages;
}

MessageController.prototype.$onInit = function() {
  var folder = this.folder;
  var Messages = this.Messages;
  var message = this.message;
  
  this.folders = this.folders.map(function(_folder) { return _folder._id; })
    .filter(function(_folder) { return _folder !== folder._id});
  this.senderName = Messages.senderName(message);
  this.headshotUrl = Messages.headshotUrl(message);

  message.read = true;
  Messages.save(message);
};

MessageController.prototype.delete = function(message) {
  var $state = this.$state;
  this.Messages.remove(message).then(function() {
    return $state.go("^", null, { reload: 'app.folder' });
  });
};

MessageController.prototype.toggleUnread = function(message) {
  message.read = !message.read;
  this.Messages.save(message);
};

MessageController.prototype.moveTo = function(message, folder) {
  var $state = this.$state;
  message.folder = folder;
  this.Messages.save(message).then(function() {
    return $state.go("^", null, { reload: 'app.folder' });
  });
};

app.component('message', {
  templateUrl: '/src/partials/message.html',
  controller: MessageController,
  bindings: { folders: '<', folder: '<', message: '<' }
});