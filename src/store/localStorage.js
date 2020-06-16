const CONSTS = {
  configuratorSettings: 'configuratorSettings',
  configuratorSettingsVersion: 2
};

function localStorageLoad(key) {
  if (localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}

function localStorageSet(key, value) {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
}

function localStoreRemove(key) {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}

module.exports = {
  localStorageLoad,
  localStorageSet,
  localStoreRemove,
  CONSTS
};
