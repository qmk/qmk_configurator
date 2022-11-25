const fs = require('fs');
const args = process.argv.slice(2);
const { PATH_CSV } = require('./env');
const referenceFile = 'en.csv';
const files = fs
  .readdirSync(PATH_CSV)
  .filter(f => f !== referenceFile && f.endsWith('csv'));
const stringify = require('csv-stringify');
const parse = require('csv-parse/lib/sync');

function aggregateRecords(records) {
  const common = records.filter(r => {
    return r.Key.split(',')[0].indexOf(':') === -1;
  });
  const others = records.filter(r => {
    return r.Key.split(',')[0].indexOf(':') !== -1;
  });
  return common.sort(sortKeys).concat(others.sort(sortKeys));
}

function sortKeys(a, b) {
  if (a.Key < b.Key) {
    return -1;
  }
  if (a.Key > b.Key) {
    return 1;
  }
  return 0;
}

function readReferenceFile() {
  return readTranslation(referenceFile);
}

function readTranslation(filename) {
  const source = fs.readFileSync(`${PATH_CSV}${filename}`, 'utf8');
  const records = parse(source, {
    columns: true,
    skip_empty_lines: true
  });
  records.sort(sortKeys);
  return records;
}

function updateMissingTranslation(
  referenceTranslation,
  dialectTranslationArray
) {
  const sK = dialectTranslationArray.find(
    s => referenceTranslation.Key === s.Key
  );
  if (!sK) {
    dialectTranslationArray.push({
      Key: referenceTranslation.Key,
      Translation: ''
    });
  }
}

function deleteDeprecatedTranslations(dialectArray, referenceArray) {
  const referenceKeys = referenceArray.map(x => x.Key);
  dialectArray = dialectArray.filter(x => referenceKeys.includes(x.Key));
  return dialectArray;
}

function syncTranslationFiles(referenceTranslations) {
  files.forEach(f => {
    let records = readTranslation(f)

    referenceTranslations.forEach(t => {
      updateMissingTranslation(t, records);
    });
    records = deleteDeprecatedTranslations(records, referenceTranslations);
    stringify(
      [{ Key: 'Key', Translation: 'Translation' }].concat(
        aggregateRecords(records)
      ),
      (err, csvOutput) => {
        fs.writeFileSync(`${PATH_CSV}${f}`, csvOutput);
      }
    );
  });
  // Reordering the reference Translation
  stringify(
    [{ Key: 'Key', Translation: 'Translation' }].concat(
      aggregateRecords(referenceTranslations)
    ),
    (err, csvOutput) => {
      fs.writeFileSync(`${PATH_CSV}en.csv`, csvOutput);
    }
  );
}

function checkTranslationFiles(referenceTranslations) {
  let errors = {};
  files.forEach(f => {
    const dialectTranslations = readTranslation(f);
    const dialectKeys = dialectTranslations.map(s => s.Key);
    const missingTranslations = referenceTranslations.filter(
      t => !dialectKeys.includes(t.Key)
    );
    if (missingTranslations.length > 0) {
      errors[f] = missingTranslations.map(s => s.Key);
    }
  });
  if (Object.keys(errors).length > 0) {
    console.log('Missing translations found');
    console.log('');
    Object.keys(errors).forEach(e => {
      console.log(`Missing Keys in ${e}`);
      console.log('');
      console.log(errors[e].join('\n'));
      console.log('');
    });
    console.log('Translation report:');
    Object.keys(errors).forEach(e => {
      console.log(`${e} : ${errors[e].length} entries missing`);
    });
    return false;
  } else {
    console.log('Everything is synchronized');
    return true;
  }
}

function main() {
  const reference = readReferenceFile();
  switch (args[0]) {
    case 'sync':
      syncTranslationFiles(reference);
      break;
    case 'chk':
      if (checkTranslationFiles(reference)) {
        process.exit(0);
      } else {
        process.exit(1);
      }
      break;
    default:
      console.log('Invalid argument. sync / ci are only available');
      process.exit(1);
  }
}

main();
