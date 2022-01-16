export const CONSTS = {
  configuratorSettings: 'configuratorSettings',
  configuratorSettingsVersion: 2
};

export function localStorageLoad(key) {
  if (localStorage) {
    return localStorage.getItem(key);
  }
  return null;
}

export function localStorageSet(key, value) {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
}

export function localStoreRemove(key) {
  if (localStorage) {
    localStorage.removeItem(key);
  }
}
