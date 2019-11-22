const { genTsObj } = require('./csv-json');
const parse = require('csv-parse/lib/sync');

exports.default = function(source) {
  const records = parse(source, {
    columns: true,
    skip_empty_lines: true
  });
  const output = genTsObj(records);
  return `export default ${JSON.stringify(output)}`;
};
