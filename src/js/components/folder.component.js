var app = angular.module('ngair');

app.controller('FolderController', function (Messages, folder, messages) {
  var $ctrl = this;
  $ctrl.folder = folder;
  $ctrl.messages = messages;

  $ctrl.senderName = Messages.senderName;
  $ctrl.headshotUrl = Messages.headshotUrl;
});