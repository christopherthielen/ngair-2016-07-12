var app = angular.module('ngair');

// Register the SessionStorage constructor (fake REST-like provider)
app.value("SessionStorage", window.SessionStorage);

app.service("Folders", function($q, SessionStorage) {
  return new SessionStorage('folders', 'data/folders.json', 0, x => $q.resolve(x));
});

app.service("Messages", function($q, SessionStorage) {
  var Messages = new SessionStorage('messages', 'data/messages.json', 0, x => $q.resolve(x));

  Messages.byFolder = function(folder) {
    let searchObject = { folder: folder._id };
    return Messages.search(searchObject);
  };

  Messages.senderName = function(message) {
    return message.senderName.first + " " + message.senderName.last;
  };

  Messages.headshotUrl = function(message) {
    var name = Messages.senderName(message);
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    }
    var gender = (hash >> 16) % 2 === 0 ? "women" : "men";
    var id = Math.abs(hash >> 10) % 100;
    return "//randomuser.me/api/portraits/" + gender + "/" + id + ".jpg";
  };

  return Messages;
});