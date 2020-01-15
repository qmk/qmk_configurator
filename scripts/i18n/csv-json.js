function namespaceNesting(o, k, v) {
  let namespace = '';
  const splittedKey = k.split(':');
  let key = '';
  if (splittedKey.length > 1) {
    namespace = splittedKey[0];
    key = splittedKey[1];
  } else {
    key = splittedKey[0];
  }
  if (!o[namespace]) {
    o[namespace] = {};
  }
  if (splittedKey.length > 2) {
    splittedKey.shift();
    namespaceNesting(o[namespace], splittedKey.join(':'), v);
  } else {
    if (v && namespace) {
      o[namespace][key] = v;
    } else if (v) {
      o[key] = v;
    }
  }
}

function genTsObj(csvEntries) {
  const o = {};
  for (const item of csvEntries) {
    namespaceNesting(o, item.Key, item.Translation);
  }
  return o;
}

module.exports = {
  genTsObj
};
