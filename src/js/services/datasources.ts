import {SessionStorage} from "../../../lib/sessionstorage.ts";

export class Folders extends SessionStorage {
  constructor() {
    super('folders', 'data/folders.json', 0, x => Promise.resolve(x));
  }
}


export class Messages extends SessionStorage {
  constructor() {
    super('messages', 'data/messages.json', 0, x => Promise.resolve(x));
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