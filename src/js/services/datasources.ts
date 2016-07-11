import {app} from "../ngmodule";
import {SessionStorage} from "../../../lib/sessionstorage.ts";

class Folders extends SessionStorage {
  constructor($q) {
    super('folders', 'data/folders.json', 0, x => $q.resolve(x));
  }
}


class Messages extends SessionStorage {
  constructor($q) {
    super('messages', 'data/messages.json', 0, x => $q.resolve(x));
  }

  byFolder(folder) {
    let searchObject = {folder: folder._id};
    return this.search(searchObject);
  }

  senderName(message) {
    return message.senderName.first + " " + message.senderName.last;
  }

  headshotUrl(message) {
    var name = this.senderName(message);
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
    }
    var gender = (hash >> 16) % 2 === 0 ? "women" : "men";
    var id = Math.abs(hash >> 10) % 100;
    return "//randomuser.me/api/portraits/" + gender + "/" + id + ".jpg";
  }

}

app.service("Folders", Folders);
app.service("Messages", Messages);