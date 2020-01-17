/**
 *
 * @param {数据库名} dbName
 * @param {库名(这里的库对应sql的表)} storeName
 */
async function initDB(dbName = "db", storeName = "store") {
  const version = 1;
  const indexDB =
    window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  const request = indexDB.open(dbName, version);
  return new Promise((resolve, reject) => {
    request.onerror = e => {
      console.log("数据库打开失败");
      reject(e);
    };
    request.onsuccess = e => {
      const db = request.result;
      resolve(db);
    };
    // 触发的优先级高于success
    request.onupgradeneeded = e => {
      const db = event.target.result;
      const store = initStore(db, storeName);
      store.createIndex("key", "key", { unique: false });
      store.createIndex("name", "name", { unique: true });
    };
  });
}
/**
 *
 * @param {数据库} db
 * @param {库名} storeName
 * @param {新建库的参数} param
 */
function initStore(db, storeName, param = { keyPath: "id" }) {
  const store = db.createObjectStore(storeName, param);
  return store;
}
/**
 *
 * @param {数据库} db
 * @param {库名} storeName
 * @param {要设置的数据} data
 */
async function setData(db, storeName, data = {}) {
  const store = getStore(db, storeName, "readwrite");
  const res = await getData(2, db, storeName);
  const ACTION = res ? "修改" : "写入";
  const request = store[res ? "put" : "add"](data);
  return new Promise((resolve, reject) => {
    request.onsuccess = function(event) {
      console.log(`数据${ACTION}成功`);
      resolve(ACTION);
    };

    request.onerror = function(event) {
      console.log(`数据${ACTION}失败`);
      reject(event);
    };
  });
}
/**
 *
 * @param {主键值} key
 * @param {数据库} db
 * @param {库名} storeName
 */
function getData(key, db, storeName) {
  const store = getStore(db, storeName);
  const request = store.get(key);
  return new Promise((resolve, reject) => {
    request.onsuccess = function(event) {
      console.log("数据读出成功");
      resolve(request.result);
    };

    request.onerror = function(event) {
      console.log("数据读出失败");
      reject(event);
    };
  });
}
/**
 *
 * @param {主键值} key
 * @param {数据库} db
 * @param {库名} storeName
 */
function delData(key, db, storeName) {
  const store = getStore(db, storeName, "readwrite");
  const request = store.delete(key);
  return new Promise((resolve, reject) => {
    request.onsuccess = function(event) {
      console.log("数据删除成功");
      resolve(event);
    };

    request.onerror = function(event) {
      console.log("数据删除失败");
      reject(event);
    };
  });
}
/**
 *
 * @param {数据库} db
 * @param {库名} storeName
 * @param {读写权限，分为readwrite/readonly} actionType
 */
function getStore(db, storeName, actionType = "readonly") {
  console.log(db, storeName);
  return db.transaction([storeName], actionType).objectStore(storeName);
}
/**
 *
 * @param {数据库名} dbName
 */
function delDB(dbName = "db") {
  const indexDB =
    window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB;
  indexDB.deleteDatabase(dbName);
}
export { initDB, initStore, setData, getData, delData, delDB };
