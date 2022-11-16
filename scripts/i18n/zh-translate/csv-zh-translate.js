// translate zh-CN to zh-HK and zh-TW

const fs = require('fs');
const path = require('path');
const Translator = require('./ToolGood.Words.Translate.js'); //type 0、繁体中文，1、港澳繁体，2、台湾正体
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify');

const PATH_CSV = path.resolve(process.cwd(), 'src', 'i18n');
const File_cn = `${PATH_CSV}/zh-CN.csv`;
const File_tw = `${PATH_CSV}/zh-TW.csv`;
const File_hk = `${PATH_CSV}/zh-HK.csv`;
const translator = new Translator();

function CreateTranslateMethod(type) {
  return function (text) {
    return translator.ToTraditionalChinese(text, type);
  };
}

//start convert
function Start(operations) {
  for (const operation of operations) {
    const src = readTranslation(operation.from);
    const target = readTranslation(operation.to);

    //this function will modify the target array
    convertEmptyTranslation(src, target, operation.method);

    //write output
    WriteOutput(target, operation.to);
  }
}

function main() {
  const operations = [
    {
      name: 'zh_TW',
      from: File_cn,
      to: File_tw,
      method: CreateTranslateMethod(2)
    },
    {
      name: 'zh_HK',
      from: File_cn,
      to: File_hk,
      method: CreateTranslateMethod(1)
    }
  ];

  try {
    Start(operations);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();

function WriteOutput(csvDataArray, file) {
  stringify(
    [{ Key: 'Key', Translation: 'Translation' }].concat(
      aggregateRecords(csvDataArray)
    ),
    (err, csvOutput) => {
      fs.writeFileSync(file, csvOutput);
    }
  );
}

function readTranslation(filename) {
  const source = fs.readFileSync(`${filename}`, 'utf8');
  const records = parse(source, {
    columns: true,
    skip_empty_lines: true
  });

  records.sort(sortKeys);
  return records;
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
function aggregateRecords(records) {
  const common = records.filter((r) => {
    return r.Key.split(',')[0].indexOf(':') === -1;
  });
  const others = records.filter((r) => {
    return r.Key.split(',')[0].indexOf(':') !== -1;
  });
  return common.sort(sortKeys).concat(others.sort(sortKeys));
}

function getByKey(csvDataArray, key) {
  return csvDataArray.find((data) => data.Key === key);
}

function getTranslation(csvDataArray, key) {
  const data = getByKey(csvDataArray, key);
  return data.Translation;
}

function ModifyTranslation(csvDataArray, key, translation) {
  for (const data of csvDataArray) {
    if (data.Key === key) {
      data.Translation = translation;
      return;
    }
  }
}

//only convert the empty or missing translation field
function convertEmptyTranslation(src, target, getConvertResult) {
  for (const line of src) {
    if (!line.Translation) continue;

    const trans = getConvertResult(line.Translation);

    if (!getByKey(target, line.Key)) {
      target.push({
        Key: line.Key,
        Translation: trans
      });
      console.log(`Add Trans -> ${line.Key}, ${trans}`);
    } else if (!getTranslation(target, line.Key)) {
      ModifyTranslation(target, line.Key, trans);
      console.log(`Modify Trans -> ${line.Key}, ${trans}`);
    }
  }
}
