const CONSTS = {
  favoriteKeyboard: 'favoriteKeyboard',
  darkmode: 'darkmode'
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

module.exports = {
  localStorageLoad,
  localStorageSet,
  CONSTS
};
