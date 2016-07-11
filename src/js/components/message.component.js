var app = angular.module('ngair');

app.controller('MessageController', function ($state, Messages, folders, folder, message) {
  var $ctrl = this;
  $ctrl.message = message;
  $ctrl.folders = folders.map(function(folder) { return folder._id; })
    .filter(function(_folder) { return _folder !== folder._id});
  $ctrl.senderName = Messages.senderName(message);
  $ctrl.headshotUrl = Messages.headshotUrl(message);

  message.read = true;
  Messages.save(message);

  $ctrl.delete = function(message) {
    Messages.remove(message).then(function() {
      return $state.go("^", null, { reload: 'app.folder' });
    });
  };

  $ctrl.toggleUnread = function(message) {
    message.read = !message.read;
    Messages.save(message);
  };

  $ctrl.moveTo = function(message, folder) {
    message.folder = folder;
    Messages.save(message).then(function() {
      return $state.go("^", null, { reload: 'app.folder' });
    });
  }
});