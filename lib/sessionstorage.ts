const setProp = (obj, key, val) => { obj[key] = val; return obj; };
const pushToArr = (array, item) => { array.push(item); return array; };
const guidChar = (c) => c !== 'x' && c !== 'y' ? '-' : Math.floor(Math.random()*16).toString(16).toUpperCase();
const guid = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".split("").map(guidChar).join("");

function fetchUrl(url) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {

      if (xhr.status == 200) {
        try {
          resolve(JSON.parse(xhr.responseText))
        } catch (error) {
          reject(error);
        }
      }

      reject(xhr.statusText);
    }
  };

  xhr.send(null);
});
}


/**
 * This class simulates a RESTful resource, but the API calls fetch data from
 * Session Storage instead of an HTTP call.
 *
 * Once configured, it loads the initial (pristine) data from the URL provided (using HTTP).
 * It exposes GET/PUT/POST/DELETE-like API that operates on the data.  All the data is also
 * stored in Session Storage.  If any data is modified in memory, session storage is updated.
 * If the browser is refreshed, the SessionStorage object will try to fetch the existing data from
 * the session, before falling back to re-fetching the initial data using HTTP.
 *
 * For an example, please see dataSources.js
 */
export class SessionStorage {
  /**
   * Creates a new SessionStorage object
   *
   * @param sessionStorageKey The session storage key. The data will be stored in browser's session storage under this key.
   * @param sourceUrl The url that contains the initial data.
   * @param delayMs The amount of fake delay to introduce
   * @param normalizePromise a function that wraps a promise or data with the preferred promise API (bluebird, $q, ES6 Promise, etc)
   */
  constructor(sessionStorageKey, sourceUrl, delayMs, normalizePromise) {
    this.sessionStorageKey = sessionStorageKey;
    this.delayMs = delayMs;
    this.normalizePromise = normalizePromise;

    let data, fromSession = sessionStorage.getItem(sessionStorageKey);

    // A promise for *all* of the data.
    this._data = undefined;

    // For each data object, the _idProp defines which property has that object's unique identifier
    this._idProp = "_id";

    // A basic triple-equals equality checker for two values
    this._eqFn = (l, r) => l[this._idProp] === r[this._idProp];

    if (fromSession) {
      try {
        // Try to parse the existing data from the Session Storage API
        data = JSON.parse(fromSession);
      } catch (e) {
        console.log("Unable to parse session messages, retrieving intial data.");
      }
    }

    let stripHashKey = (obj) =>
    setProp(obj, '$$hashKey', undefined);

    // Create a promise for the data; Either the existing data from session storage, or the initial data via xhr
    this._data = this.normalizePromise(data ? data : fetchUrl(sourceUrl))
        .then(this._commit.bind(this))
        .then(() => JSON.parse(sessionStorage.getItem(sessionStorageKey)))
  .then(array => array.map(stripHashKey));

  }

  /** Saves all the data back to the session storage */
  _commit(data) {
    sessionStorage.setItem(this.sessionStorageKey, JSON.stringify(data));
    return this.normalizePromise(data);
  }

  /** Helper which simulates a delay, then provides the `thenFn` with the data */
  all(thenFn) {
    return this.normalizePromise(new Promise((resolve) => {
      setTimeout(() => resolve(this._data), this.delayMs);
  })).then(thenFn);
  }

  /** Given a sample item, returns a promise for all the data for items which have the same properties as the sample */
  search(exampleItem) {
    let contains = (search, inString) =>
    ("" + inString).indexOf("" + search) !== -1;
    let matchesExample = (example, item) =>
    Object.keys(example).reduce((memo, key) => memo && contains(example[key], item[key]), true);
    return this.all(items =>
      items.filter(matchesExample.bind(null, exampleItem)));
  }

  /** Returns a promise for the item with the given identifier */
  get(id) {
    return this.all(items =>
      items.find(item => item[this._idProp] === id));
  }

  /** Returns a promise to save the item.  It delegates to put() or post() if the object has or does not have an identifier set */
  save(item) {
    return item[this._idProp] ? this.put(item) : this.post(item);
  }

  /** Returns a promise to save (POST) a new item.   The item's identifier is auto-assigned. */
  post(item) {
    item[this._idProp] = guid();
    return this.all(items => pushToArr(items, item)).then(this._commit.bind(this));
  }

  /** Returns a promise to save (PUT) an existing item. */
  put(item, eqFn = this._eqFn) {
    return this.all(items => {
        let idx = items.findIndex(eqFn.bind(null, item));
    if (idx === -1) throw Error(`${item} not found in ${this}`);
    items[idx] = item;
    return this._commit(items).then(() => item);
  });
  }

  /** Returns a promise to remove (DELETE) an item. */
  remove(item, eqFn = this._eqFn) {
    return this.all(items => {
        let idx = items.findIndex(eqFn.bind(null, item));
    if (idx === -1) throw Error(`${item} not found in ${this}`);
    items.splice(idx, 1);
    return this._commit(items).then(() => item);
  });
  }
}